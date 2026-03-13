import path from 'path'
import { execSync } from 'child_process'

const TENANT_DOMAIN_MAP: Record<string, string> = {
  y2mp4: 'https://y2mp4.com',
  y2bmp3: 'https://y2bmp3.com',
  y2script: 'https://y2script.com',
}

const PROJECT_BASENAME_MAP: Record<string, string> = {
  'yt-downloader': 'y2mp4',
  y2bmp3: 'y2bmp3',
  ytbscript: 'y2script',
}

const REPO_SLUG_TENANT_MAP: Record<string, string> = {
  'soundwiseai/yt-downloader': 'y2mp4',
  'Ericgood/y2bmp3': 'y2bmp3',
  'Ericgood/y2script': 'y2script',
}

type InferProjectIdentityOptions = {
  projectRoot: string
  tenantSlug?: string
  siteDomain?: string
}

function normalizeSiteDomain(siteDomain?: string): string | null {
  const trimmed = siteDomain?.trim()
  if (!trimmed) {
    return null
  }

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
  return withProtocol.replace(/\/+$/, '')
}

function inferTenantFromDomain(siteDomain?: string): string | null {
  const normalizedDomain = normalizeSiteDomain(siteDomain)
  if (!normalizedDomain) {
    return null
  }

  const host = new URL(normalizedDomain).hostname.replace(/^www\./, '')
  return (
    Object.entries(TENANT_DOMAIN_MAP).find(([, domain]) => new URL(domain).hostname === host)?.[0] ??
    null
  )
}

function extractGitHubRepoSlug(remoteUrl: string): string | null {
  const match = remoteUrl.trim().match(/github\.com[:/](.+?)(?:\.git)?$/i)
  return match?.[1] ?? null
}

function readGitRepoSlug(projectRoot: string): string | null {
  try {
    const remoteUrl = execSync('git remote get-url origin', {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    }).trim()

    return extractGitHubRepoSlug(remoteUrl)
  } catch {
    return null
  }
}

export function inferTenantSlug(options: InferProjectIdentityOptions): string {
  const explicitTenant = options.tenantSlug?.trim()
  if (explicitTenant) {
    return explicitTenant
  }

  const tenantFromDomain = inferTenantFromDomain(options.siteDomain)
  if (tenantFromDomain) {
    return tenantFromDomain
  }

  const basename = path.basename(options.projectRoot)
  if (PROJECT_BASENAME_MAP[basename]) {
    return PROJECT_BASENAME_MAP[basename]
  }

  const repoSlug = readGitRepoSlug(options.projectRoot)
  if (repoSlug && REPO_SLUG_TENANT_MAP[repoSlug]) {
    return REPO_SLUG_TENANT_MAP[repoSlug]
  }

  return 'y2mp4'
}

export function inferSiteDomain(options: InferProjectIdentityOptions): string {
  const explicitDomain = normalizeSiteDomain(options.siteDomain)
  if (explicitDomain) {
    return explicitDomain
  }

  const tenantSlug = inferTenantSlug(options)
  return TENANT_DOMAIN_MAP[tenantSlug] || TENANT_DOMAIN_MAP.y2mp4
}
