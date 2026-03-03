#!/usr/bin/env python3
"""
Split monolithic i18n JSON files into page-specific files.
Option A: Keeps all key prefixes intact. Pure organizational split.

Usage: python3 scripts/split_i18n.py
"""
import json
import os
import sys

LOCALES_DIR = os.path.join(os.path.dirname(__file__), '..', 'i18n', 'locales')

# Keys that go into common.json (Header/Footer/errors only)
# SEO dicts go into their respective page files for easier maintenance
COMMON_KEYS = {
    'resource', 'tools', 'comparison', 'comparisonText', 'email',
    'privacyPolicy', 'termsOfService', 'errorGetVideoInfo',
    'errorTranscriptUnavailable', 'siteName', 'videoDownloader',
    'mp3Converter', 'transcribeGenerator', 'youtube2m4a', 'saveTip',
}

# Prefix-to-file mapping (order matters: longer prefixes first if needed)
PAGE_PREFIXES = [
    ('mp3_', 'mp3.json'),
    ('downloader_', 'downloader.json'),
    ('transcript_', 'transcript.json'),
    ('m4a_', 'm4a.json'),
]


def categorize_key(key):
    """Return the target filename for a given key."""
    if key in COMMON_KEYS:
        return 'common.json'
    for prefix, filename in PAGE_PREFIXES:
        if key.startswith(prefix):
            return filename
    # Everything else (no prefix) is MP4 default page
    return 'mp4.json'


def split_locale(locale_file):
    """Split a single locale JSON file into 6 files in a subdirectory."""
    filepath = os.path.join(LOCALES_DIR, locale_file)
    locale_code = locale_file.replace('.json', '')
    output_dir = os.path.join(LOCALES_DIR, locale_code)

    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Partition keys into buckets (preserving original order)
    buckets = {
        'common.json': {},
        'mp4.json': {},
        'mp3.json': {},
        'downloader.json': {},
        'transcript.json': {},
        'm4a.json': {},
    }

    for key, value in data.items():
        target = categorize_key(key)
        buckets[target][key] = value

    # Validate: no keys lost
    total_split = sum(len(b) for b in buckets.values())
    assert total_split == len(data), (
        f"{locale_file}: Split has {total_split} keys, original has {len(data)}"
    )

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Write each bucket
    for filename, content in buckets.items():
        outpath = os.path.join(output_dir, filename)
        with open(outpath, 'w', encoding='utf-8') as f:
            json.dump(content, f, ensure_ascii=False, indent=2)
            f.write('\n')

    counts = ", ".join(f"{fn}({len(c)})" for fn, c in buckets.items())
    print(f"  {locale_code}/: {counts}")
    return buckets


def verify_merge(locale_file, buckets):
    """Verify that merging all bucket files reproduces the original data."""
    filepath = os.path.join(LOCALES_DIR, locale_file)
    with open(filepath, 'r', encoding='utf-8') as f:
        original = json.load(f)

    merged = {}
    for content in buckets.values():
        merged.update(content)

    # Check key-by-key
    for key in original:
        assert key in merged, f"{locale_file}: Key '{key}' missing after merge"
        assert merged[key] == original[key], (
            f"{locale_file}: Value mismatch for key '{key}'"
        )

    for key in merged:
        assert key in original, f"{locale_file}: Extra key '{key}' after merge"


def main():
    locale_files = sorted(
        f for f in os.listdir(LOCALES_DIR)
        if f.endswith('.json') and os.path.isfile(os.path.join(LOCALES_DIR, f))
    )

    if not locale_files:
        print("No locale JSON files found. Already split?")
        sys.exit(1)

    print(f"Found {len(locale_files)} locale files to split.\n")

    for locale_file in locale_files:
        print(f"Splitting {locale_file}...")
        buckets = split_locale(locale_file)
        verify_merge(locale_file, buckets)
        print(f"  ✅ Verified: merge matches original.\n")

    print(f"All {len(locale_files)} files split and verified successfully.")
    print(f"Generated {len(locale_files)} directories × 6 files = {len(locale_files) * 6} JSON files.")


if __name__ == '__main__':
    main()
