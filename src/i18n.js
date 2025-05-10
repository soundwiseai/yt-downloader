import { createI18n } from "vue-i18n";

// 🌍 支持的语言
const messages = {
    en: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "YouTube Video Downloader",
        mp3Converter: "YouTube to MP3 Converter",
        title: "YouTube to MP4 Converter",
        description: "Paste URL and Quick Convert YouTube to MP4. Always free, always works, no ads.",
        download: "DOWNLOAD",
        tip: "Please be mindful of copyright when downloading content. This tool isn't designed for downloading copyrighted music.",
        formats: "All Formats",
        formatsTip: "Click to save",
        reviews: [
            { text: "Perfect for saving my favorite videos! Fast downloads and super simple to use. No registration needed.", author: "Sarah_Bennett92" },
            { text: "This tool is great! I love how easy it is to download videos in various formats.", author: "John_Doe" },
            { text: "I’ve been using this for months, and it always works perfectly.", author: "Jane_Smith" },
            { text: "Fast and reliable. The best video downloader!", author: "Michael_Johnson" },
            { text: "Easy to use and very effective for saving content.", author: "David_Lee" },
            { text: "Highly recommended! Works flawlessly for all my videos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "How to Convert YouTube Video to MP4",
        howToConvertDescription: `Imagine being on a long flight or in a remote area with no internet access. Streaming your favorite video becomes impossible, right? 
    That’s where offline viewing saves the day. By downloading videos in advance, you can enjoy uninterrupted entertainment anytime, anywhere. 
    A YouTube to MP4 converter makes this process seamless. It lets you download YouTube videos quickly and efficiently.`,
        step: "Step",
        copyUrl: "Copy the YouTube Video URL",
        clickDownload: "Directly click on the ‘Download’ button",
        saveVideo: "Wait for minutes and save the video",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "High Success Rate YouTube Downloads", description: "Download YouTube videos effortlessly with our advanced converter, featuring industry-leading success rates and reliable quality preservation for all content types." },
            { icon: require('@/assets/yt_feature2.png'), title: "Lightning-Fast YouTube to MP4 Converter", description: "Transform YouTube videos into high-quality MP4 files in seconds. Experience seamless, instant downloads without compromising video quality." },
            { icon: require('@/assets/yt_feature3.png'), title: "100% Safe and Secure", description: "Download YouTube videos safely with our clean, privacy-focused converter. No tracking, no malware – just pure simplicity." },
            { icon: require('@/assets/yt_feature4.png'), title: "Unlimited Downloads", description: "Convert and save as many YouTube videos as your heart desires, with zero waiting time or pesky download caps getting in your way." },
            { icon: require('@/assets/yt_feature5.png'), title: "No Login & No Software Installation", description: "Jump right in and convert videos without creating accounts or downloading anything. Just paste your link and you're good to go – no fuss, no hassle." },
            { icon: require('@/assets/yt_feature6.png'), title: "Various Formats Support", description: "Download in MP4, M4A, or WEBM. Whatever format or quality you're after, we've got you covered." }
        ],
        downloadNow: "Download Now >>",
        featuresConverter: "Features of YouTube Video Converter",
        benefits: {
            title: "Benefits of Using YouTube to MP4 Converter",
            convenience: {
                title: "Convenience and Accessibility",
                description: "Have you ever been stuck somewhere without internet access, wishing you could watch your favorite video? A YouTube to MP4 converter solves this problem. It lets you download videos in MP4 format, which works on almost any device. Whether you’re using a smartphone, tablet, or laptop, you can enjoy your content without worrying about compatibility.\n\nOffline viewing also makes life easier when you’re traveling or in areas with poor connectivity. You don’t have to deal with buffering or interruptions. Plus, downloading videos ensures you always have access to high-quality content, even when the internet isn’t an option."
            },
            avoidAds: {
                title: "Avoid Ads",
                description: "Ads can be frustrating, especially when they interrupt your favorite videos. With a YouTube MP4 downloader, you can skip the ads entirely. Once you download a video, you can watch it without any interruptions. This means no more waiting for those 'Skip Ad' buttons to appear.\n\nBy avoiding ads, you save time and enjoy a smoother viewing experience."
            },
            saveData: {
                title: "Save Data and Storage",
                description: "Streaming videos can quickly eat up your mobile data, especially if you’re on a limited plan. A YouTube MP4 downloader helps you save data by letting you download videos over Wi-Fi. Once downloaded, you can watch them as many times as you want without using any additional data."
            },
            moreFromDownloads: {
                title: "Get More From Your Downloads",
                description: "Say goodbye to buffering and data drains! Here's how to make the most of your offline videos:\n<strong>1.Build Your Personal Media Library</strong>\nCreate your own Netflix-style collection. \n<strong>2.Travel Without Worries</strong>\nNo more spotty airplane WiFi or boring road trips. \n<strong>3.Save Those Precious Data Bytes</strong>\nDownload over WiFi, watch anytime."
            }
        },
        faqTitle: "FAQ",
        faq1Question: "1. Is it legal to use a YouTube to MP4 converter?",
        faq1Answer: "It depends on the video. You can legally download videos with a Creative Commons license or those explicitly allowed for offline use. Avoid downloading copyrighted content without permission to stay on the right side of the law. Tip: Always check the video’s terms of use before downloading.",
        faq2Question: "2. Can I use a YouTube to MP4 converter on my phone?",
        faq2Answer: "Yes! It works on mobile devices. You can use apps or mobile-friendly websites to download videos directly to your phone. Just paste the video link, select MP4, and hit download.",
        faq3Question: "3. What’s the best resolution to download YouTube videos in?",
        faq3Answer: "It depends on your needs. For high-quality playback, go for HD (720p) or 4K. If you’re saving storage space, choose a lower resolution like 480p. Pro Tip: Balance quality and file size based on your device’s storage capacity.",
        faq4Question: "4. Are free YouTube to MP4 converters safe?",
        faq4Answer: "While many free converters out there can be sketchy, we take your security seriously. Our converter runs entirely in your browser without any sneaky downloads or suspicious pop-ups. We use secure HTTPS encryption and never store your personal data or viewing history. Plus, we regularly scan for malware and keep our service squeaky clean. No spyware, no bloatware - just straightforward video conversion you can trust.",
        faq5Question: "5. Who uses the YouTube to MP4 converter?",
        faq5Answer: "Our converter is perfect for all sorts of users. Content creators, students, teachers, road warriors, business pros, and everyday viewers will love it. You can convert videos without any limits. No need to create an account or download software."

    },
    es: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "Descargador de videos de YouTube",
        mp3Converter: "Convertidor de YouTube a MP3",
        title: "Convertidor de YouTube a MP4",
        description: "Pega la URL y convierte YouTube a MP4 rápidamente. Siempre gratis, siempre funciona, sin anuncios.",
        download: "DESCARGAR",
        tip: "Tenga en cuenta los derechos de autor al descargar contenido. Esta herramienta no está diseñada para descargar música con derechos de autor.",
        formats: "Todos los formatos",
        formatsTip: "Haga clic para guardar",
        reviews: [
            { text: "¡Perfecto para guardar mis videos favoritos! Descargas rápidas y súper fácil de usar. No se necesita registro.", author: "Sarah_Bennett92" },
            { text: "¡Esta herramienta es genial! Me encanta lo fácil que es descargar videos en varios formatos.", author: "John_Doe" },
            { text: "Llevo meses usándolo, y siempre funciona perfectamente.", author: "Jane_Smith" },
            { text: "Rápido y confiable. ¡El mejor descargador de videos!", author: "Michael_Johnson" },
            { text: "Fácil de usar y muy eficaz para guardar contenido.", author: "David_Lee" },
            { text: "¡Altamente recomendado! Funciona a la perfección con todos mis videos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "Cómo convertir un video de YouTube a MP4",
        howToConvertDescription: `Imagina estar en un largo vuelo o en un área remota sin acceso a Internet. ¿Transmitir tu video favorito se vuelve imposible, verdad? 
      Ahí es donde la visualización sin conexión salva el día. Al descargar videos con anticipación, puedes disfrutar de entretenimiento ininterrumpido en cualquier momento y lugar. 
      Un convertidor de YouTube a MP4 hace que este proceso sea fácil. Te permite descargar videos de YouTube rápida y eficientemente.`,
        step: "Paso",
        copyUrl: "Copia la URL del video de YouTube",
        clickDownload: "Haz clic directamente en el botón 'Descargar'",
        saveVideo: "Espera unos minutos y guarda el video",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "Alta tasa de éxito en descargas de YouTube", description: "Descargue videos de YouTube sin esfuerzo con nuestro convertidor avanzado, que ofrece tasas de éxito líderes en la industria y conservación confiable de la calidad para todos los tipos de contenido." },
            { icon: require('@/assets/yt_feature2.png'), title: "Convertidor de YouTube a MP4 ultrarrápido", description: "Convierte videos de YouTube a archivos MP4 de alta calidad en segundos. Experimenta descargas instantáneas sin comprometer la calidad del video." },
            { icon: require('@/assets/yt_feature3.png'), title: "100% seguro y confiable", description: "Descargue videos de YouTube de manera segura con nuestro convertidor limpio y centrado en la privacidad. Sin rastreo, sin malware, solo simplicidad." },
            { icon: require('@/assets/yt_feature4.png'), title: "Descargas ilimitadas", description: "Convierte y guarda tantos videos de YouTube como desees, sin tiempos de espera ni límites de descarga molestos." },
            { icon: require('@/assets/yt_feature5.png'), title: "Sin inicio de sesión ni instalación de software", description: "Comienza a convertir videos sin crear cuentas ni descargar nada. Simplemente pega tu enlace y listo, sin complicaciones." },
            { icon: require('@/assets/yt_feature6.png'), title: "Soporte para varios formatos", description: "Descarga en MP4, M4A o WEBM. Cualquiera sea el formato o calidad que busques, te lo cubrimos." }
        ],
        downloadNow: "Descargar ahora >>",
        featuresConverter: "Características del Convertidor de Videos de YouTube",
        benefits: {
            title: "Beneficios de usar el Convertidor de YouTube a MP4",
            convenience: {
                title: "Comodidad y Accesibilidad",
                description: "¿Alguna vez te has quedado sin acceso a Internet, deseando poder ver tu video favorito? Un convertidor de YouTube a MP4 resuelve este problema. Te permite descargar videos en formato MP4, que funciona en casi cualquier dispositivo."
            },
            avoidAds: {
                title: "Evitar Anuncios",
                description: "¡Los anuncios pueden ser molestos! Con un descargador de YouTube MP4, puedes saltarte los anuncios completamente. "
            },
            saveData: {
                title: "Ahorrar Datos y Almacenamiento",
                description: "Ver videos en streaming puede consumir rápidamente tus datos móviles."
            },
            moreFromDownloads: {
                title: "Obtén Más de tus Descargas",
                description: "¡Di adiós a los tiempos de espera y la reducción de datos! Usa tus videos sin conexión y guarda datos."
            }
        },
        faqTitle: "Preguntas frecuentes",
        faq1Question: "1. ¿Es legal usar un convertidor de YouTube a MP4?",
        faq1Answer: "Depende del video. Puedes descargar videos legalmente con licencia Creative Commons o aquellos explícitamente permitidos para uso sin conexión. Evita descargar contenido con derechos de autor sin permiso para mantenerte en el lado correcto de la ley. Consejo: Siempre revisa los términos de uso del video antes de descargar.",
        faq2Question: "2. ¿Puedo usar un convertidor de YouTube a MP4 en mi teléfono?",
        faq2Answer: "¡Sí! Funciona en dispositivos móviles. Puedes usar aplicaciones o sitios web adaptados para dispositivos móviles para descargar videos directamente a tu teléfono. Solo pega el enlace del video, selecciona MP4 y presiona descargar.",
        faq3Question: "3. ¿Cuál es la mejor resolución para descargar videos de YouTube?",
        faq3Answer: "Depende de tus necesidades. Para una reproducción de alta calidad, opta por HD (720p) o 4K. Si deseas ahorrar espacio de almacenamiento, elige una resolución más baja como 480p. Consejo: Equilibra calidad y tamaño del archivo según la capacidad de almacenamiento de tu dispositivo.",
        faq4Question: "4. ¿Son seguros los convertidores gratuitos de YouTube a MP4?",
        faq4Answer: "Aunque muchos convertidores gratuitos pueden ser sospechosos, tomamos tu seguridad muy en serio. Nuestro convertidor funciona completamente en tu navegador sin descargas sospechosas o ventanas emergentes. Usamos cifrado HTTPS seguro y nunca almacenamos tus datos personales ni tu historial de visualización. Además, escaneamos regularmente en busca de malware y mantenemos nuestro servicio limpio. Sin spyware, sin software adicional, solo una conversión de videos confiable.",
        faq5Question: "5. ¿Quién usa el convertidor de YouTube a MP4?",
        faq5Answer: "Nuestro convertidor es perfecto para todo tipo de usuarios. Creadores de contenido, estudiantes, profesores, viajeros frecuentes, profesionales de negocios y espectadores cotidianos lo adorarán. Puedes convertir videos sin ningún límite. No es necesario crear una cuenta ni descargar software."

    },
    ar: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "محمل فيديو يوتيوب",
        mp3Converter: "محول يوتيوب إلى MP3",
        title: "محول يوتيوب إلى MP4",
        description: "الصق الرابط وحوّل YouTube إلى MP4 بسرعة. دائمًا مجاني، يعمل دائمًا، بدون إعلانات.",
        download: "تحميل",
        tip: "يرجى مراعاة حقوق الطبع والنشر عند تنزيل المحتوى. هذه الأداة ليست مصممة لتنزيل الموسيقى المحمية بحقوق النشر.",
        formats: "جميع الصيغ",
        formatsTip: "اضغط للحفظ",
        reviews: [
            { text: "مثالي لحفظ مقاطع الفيديو المفضلة لدي! التنزيلات السريعة وسهلة للغاية في الاستخدام. لا حاجة للتسجيل.", author: "Sarah_Bennett92" },
            { text: "هذه الأداة رائعة! أحب كيف أنه من السهل تنزيل مقاطع الفيديو بتنسيقات متعددة.", author: "John_Doe" },
            { text: "لقد كنت أستخدمها منذ أشهر، وهي دائمًا تعمل بشكل مثالي.", author: "Jane_Smith" },
            { text: "سريع وموثوق. أفضل محمل فيديو!", author: "Michael_Johnson" },
            { text: "سهل الاستخدام وفعال جدًا لحفظ المحتوى.", author: "David_Lee" },
            { text: "موصى به بشدة! يعمل بشكل رائع مع جميع مقاطع الفيديو الخاصة بي.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "محول فيديو يوتيوب إلى MP4",
        howToConvertDescription: `تخيل أنك على متن طائرة لفترة طويلة أو في منطقة نائية بدون اتصال بالإنترنت. يصبح من المستحيل بث الفيديو المفضل لديك، أليس كذلك؟ 
      هذا هو المكان الذي تأتي فيه المشاهدة دون اتصال بالإنترنت لإنقاذ اليوم. من خلال تنزيل مقاطع الفيديو مسبقًا، يمكنك الاستمتاع بالترفيه المتواصل في أي وقت وأي مكان. 
      يسمح لك محول YouTube إلى MP4 بتنزيل مقاطع الفيديو بسرعة وكفاءة.`,
        step: "خطوة",
        copyUrl: "انسخ رابط فيديو يوتيوب",
        clickDownload: "انقر مباشرة على زر 'تنزيل'",
        saveVideo: "انتظر لبضع دقائق واحفظ الفيديو",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "محمل فيديو يوتيوب بنجاح عالٍ", description: "قم بتنزيل مقاطع فيديو YouTube بسهولة مع محولنا المتقدم، الذي يتميز بمعدلات نجاح رائدة في الصناعة والحفاظ على الجودة لجميع أنواع المحتوى." },
            { icon: require('@/assets/yt_feature2.png'), title: "محول YouTube إلى MP4 بسرعة البرق", description: "حوّل مقاطع فيديو YouTube إلى ملفات MP4 عالية الجودة في ثوانٍ. استمتع بتنزيلات فورية وسلسة دون المساس بجودة الفيديو." },
            { icon: require('@/assets/yt_feature3.png'), title: "آمن 100% وموثوق", description: "قم بتنزيل مقاطع فيديو YouTube بأمان مع محولنا النظيف والمركّز على الخصوصية. لا تتبع، لا برمجيات خبيثة – فقط البساطة الخالصة." },
            { icon: require('@/assets/yt_feature4.png'), title: "تنزيلات غير محدودة", description: "حوّل وحفظ مقاطع فيديو YouTube كما تشاء، دون أوقات انتظار أو حدود تنزيل مزعجة." },
            { icon: require('@/assets/yt_feature5.png'), title: "بدون تسجيل دخول أو تثبيت برنامج", description: "ابدأ بالتحويل دون إنشاء حسابات أو تنزيل أي شيء. فقط الصق الرابط الخاص بك وستكون جاهزًا – لا متاعب." },
            { icon: require('@/assets/yt_feature6.png'), title: "دعم تنسيقات متعددة", description: "قم بالتنزيل بصيغة MP4 أو M4A أو WEBM. مهما كان التنسيق أو الجودة التي تبحث عنها، نحن هنا لتلبية احتياجاتك." }
        ],
        downloadNow: "تحميل الآن >>",
        featuresConverter: " ميزات محول فيديو يوتيوب",
        benefits: {
            title: "فوائد استخدام محول YouTube إلى MP4",
            convenience: {
                title: "الراحة والوصول",
                description: "هل سبق لك أن كنت عالقًا في مكان بدون الوصول إلى الإنترنت، وتمنى لو كنت تستطيع مشاهدة الفيديو المفضل لديك؟ يحل محول YouTube إلى MP4 هذه المشكلة."
            },
            avoidAds: {
                title: "تجنب الإعلانات",
                description: "يمكن أن تكون الإعلانات مزعجة، خاصةً عندما تقاطع الفيديوهات المفضلة لديك."
            },
            saveData: {
                title: "توفير البيانات والتخزين",
                description: "يمكن أن تستهلك مشاهدة الفيديوهات عبر الإنترنت بسرعة بيانات الهاتف المحمول."
            },
            moreFromDownloads: {
                title: "احصل على المزيد من التنزيلات",
                description: "وداعًا للتحميل البطيء والمشاكل مع البيانات!"
            }
        },
        faqTitle: "الأسئلة الشائعة",
        faq1Question: "1. هل من القانوني استخدام محول YouTube إلى MP4؟",
        faq1Answer: "يعتمد ذلك على الفيديو. يمكنك تنزيل مقاطع الفيديو بشكل قانوني باستخدام رخصة Creative Commons أو تلك التي يُسمح بها صراحةً للاستخدام دون اتصال. تجنب تنزيل المحتوى المحمي بحقوق الطبع والنشر دون إذن للبقاء في الجانب الصحيح من القانون. نصيحة: تحقق دائمًا من شروط استخدام الفيديو قبل التنزيل.",
        faq2Question: "2. هل يمكنني استخدام محول YouTube إلى MP4 على هاتفي؟",
        faq2Answer: "نعم! يعمل على الأجهزة المحمولة. يمكنك استخدام التطبيقات أو المواقع الإلكترونية المتوافقة مع الأجهزة المحمولة لتنزيل مقاطع الفيديو مباشرة إلى هاتفك. فقط الصق رابط الفيديو، حدد MP4، واضغط على تنزيل.",
        faq3Question: "3. ما هو أفضل دقة لتنزيل مقاطع فيديو YouTube؟",
        faq3Answer: "يعتمد ذلك على احتياجاتك. للحصول على عرض عالي الجودة، اختر HD (720p) أو 4K. إذا كنت توفر مساحة التخزين، اختر دقة أقل مثل 480p. نصيحة: توازن بين الجودة وحجم الملف استنادًا إلى سعة تخزين جهازك.",
        faq4Question: "4. هل محولات YouTube إلى MP4 المجانية آمنة؟",
        faq4Answer: "على الرغم من أن العديد من المحولات المجانية قد تكون مشبوهة، إلا أننا نأخذ أمانك على محمل الجد. يعمل محولنا بالكامل في متصفحك دون أي تنزيلات خادعة أو نوافذ منبثقة مشبوهة. نحن نستخدم تشفير HTTPS آمن ولا نخزن بياناتك الشخصية أو تاريخ المشاهدة. بالإضافة إلى ذلك، نفحص بانتظام للكشف عن البرامج الضارة ونبقي خدمتنا نظيفة. لا برامج تجسس، لا برامج إضافية - فقط تحويل مقاطع الفيديو الموثوق به.",
        faq5Question: "5. من يستخدم محول YouTube إلى MP4؟",
        faq5Answer: "محولنا مثالي لجميع أنواع المستخدمين. يحبها منشئو المحتوى، الطلاب، المعلمون، المسافرون، المحترفون في الأعمال والمشاهدون العاديون. يمكنك تحويل مقاطع الفيديو دون أي حدود. لا حاجة لإنشاء حساب أو تنزيل أي برامج."

    },
    hi: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "यूट्यूब वीडियो डाउनलोडर",
        mp3Converter: "यूट्यूब से MP3 कन्वर्टर",
        title: "YouTube से MP4 कन्वर्टर",
        description: "URL पेस्ट करें और YouTube को MP4 में तुरंत कन्वर्ट करें। हमेशा मुफ्त, हमेशा काम करता है, कोई विज्ञापन नहीं।",
        download: "डाउनलोड",
        tip: "कृपया डाउनलोड करते समय कॉपीराइट का ध्यान रखें। यह टूल कॉपीराइटेड संगीत डाउनलोड करने के लिए डिज़ाइन नहीं किया गया है।",
        formats: "सभी प्रारूप",
        formatsTip: "सहेजने के लिए क्लिक करें",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "YouTube वीडियो को MP4 में कैसे कनवर्ट करें",
        howToConvertDescription: `URL पेस्ट करें और YouTube को MP4 में तुरंत कन्वर्ट करें। हमेशा मुफ्त, हमेशा काम करता है, कोई विज्ञापन नहीं।`,
        step: "चरण",
        copyUrl: "YouTube वीडियो URL कॉपी करें",
        clickDownload: "‘डाउनलोड’ बटन पर सीधे क्लिक करें",
        saveVideo: "कुछ मिनटों तक प्रतीक्षा करें और वीडियो को सहेजें",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "उच्च सफलता दर YouTube डाउनलोड", description: "हमारे उन्नत कन्वर्टर के साथ YouTube वीडियो को आसानी से डाउनलोड करें, जिसमें उद्योग-अग्रणी सफलता दर और सभी सामग्री प्रकारों के लिए विश्वसनीय गुणवत्ता संरक्षण शामिल है।" },
            { icon: require('@/assets/yt_feature2.png'), title: "लाइटनिंग-फास्ट YouTube से MP4 कन्वर्टर", description: "YouTube वीडियो को सेकंडों में उच्च गुणवत्ता वाले MP4 फ़ाइलों में बदलें। वीडियो गुणवत्ता से समझौता किए बिना सहज और तत्काल डाउनलोड का अनुभव करें।" },
            { icon: require('@/assets/yt_feature3.png'), title: "100% सुरक्षित और सुरक्षित", description: "हमारे स्वच्छ, गोपनीयता-केंद्रित कन्वर्टर के साथ YouTube वीडियो को सुरक्षित रूप से डाउनलोड करें। कोई ट्रैकिंग नहीं, कोई मैलवेयर नहीं – केवल शुद्ध सादगी।" },
            { icon: require('@/assets/yt_feature4.png'), title: "असीमित डाउनलोड", description: "YouTube वीडियो को जितना चाहें उतना बदलें और सेव करें, बिना किसी प्रतीक्षा समय या परेशान करने वाली डाउनलोड सीमा के।" },
            { icon: require('@/assets/yt_feature5.png'), title: "कोई लॉगिन और कोई सॉफ़्टवेयर इंस्टॉलेशन नहीं", description: "खाता बनाए बिना या कुछ भी डाउनलोड किए बिना वीडियो कन्वर्ट करना शुरू करें। बस अपनी लिंक पेस्ट करें और आप अच्छे से चलें – कोई झंझट नहीं।" },
            { icon: require('@/assets/yt_feature6.png'), title: "विभिन्न प्रारूप समर्थन", description: "MP4, M4A, या WEBM में डाउनलोड करें। जो भी प्रारूप या गुणवत्ता आप चाहते हैं, हमने आपको कवर किया है।" }
        ],
        downloadNow: "अब डाउनलोड करें >>",
        featuresConverter: "YouTube वीडियो कनवर्टर की विशेषताएँ",
        benefits: {
            title: "YouTube से MP4 कन्वर्टर के लाभ",
            convenience: {
                title: "सुविधा और पहुँच",
                description: "क्या आपने कभी किसी ऐसे स्थान पर फंसा महसूस किया है जहाँ इंटरनेट की पहुँच नहीं थी, और आप अपना पसंदीदा वीडियो देखना चाहते थे? एक YouTube से MP4 कन्वर्टर इस समस्या को हल करता है। यह आपको MP4 प्रारूप में वीडियो डाउनलोड करने देता है, जो लगभग किसी भी डिवाइस पर काम करता है।"
            },
            avoidAds: {
                title: "विज्ञापन से बचें",
                description: "विज्ञापन परेशान कर सकते हैं, खासकर जब वे आपके पसंदीदा वीडियो को बीच में ही रोक देते हैं। एक YouTube MP4 डाउनलोडर के साथ, आप पूरी तरह से विज्ञापनों को स्किप कर सकते हैं।"
            },
            saveData: {
                title: "डेटा और स्टोरेज बचाएं",
                description: "वीडियो स्ट्रीमिंग आपकी मोबाइल डेटा को जल्दी से खा सकती है, खासकर अगर आप सीमित प्लान पर हैं।"
            },
            moreFromDownloads: {
                title: "अपने डाउनलोड्स से अधिक प्राप्त करें",
                description: "बफरिंग और डेटा खपत को अलविदा कहें! यह है कि आप अपने ऑफलाइन वीडियो का सबसे अच्छा उपयोग कैसे कर सकते हैं।"
            }
        },
        faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
        faq1Question: "1. क्या YouTube से MP4 कनवर्टर का उपयोग करना कानूनी है?",
        faq1Answer: "यह वीडियो पर निर्भर करता है। आप Creative Commons लाइसेंस वाले वीडियो या जो वीडियो स्पष्ट रूप से ऑफलाइन उपयोग के लिए अनुमत हैं, उन्हें कानूनी रूप से डाउनलोड कर सकते हैं। बिना अनुमति के कॉपीराइट सामग्री डाउनलोड करने से बचें ताकि आप कानूनी रूप से सुरक्षित रहें। टिप: डाउनलोड करने से पहले हमेशा वीडियो की उपयोग शर्तों की जांच करें।",
        faq2Question: "2. क्या मैं अपने फोन पर YouTube से MP4 कनवर्टर का उपयोग कर सकता हूं?",
        faq2Answer: "हां! यह मोबाइल डिवाइस पर काम करता है। आप वीडियो को सीधे अपने फोन में डाउनलोड करने के लिए ऐप्स या मोबाइल-फ्रेंडली वेबसाइट्स का उपयोग कर सकते हैं। बस वीडियो लिंक पेस्ट करें, MP4 चुनें, और डाउनलोड पर क्लिक करें।",
        faq3Question: "3. YouTube वीडियो डाउनलोड करने के लिए सबसे अच्छा रिज़ॉल्यूशन क्या है?",
        faq3Answer: "यह आपकी आवश्यकताओं पर निर्भर करता है। उच्च गुणवत्ता वाले प्ले बैक के लिए, HD (720p) या 4K चुनें। यदि आप संग्रहण स्थान बचाना चाहते हैं, तो 480p जैसे कम रिज़ॉल्यूशन का चयन करें। टिप: अपने डिवाइस के स्टोरेज क्षमता के आधार पर गुणवत्ता और फ़ाइल आकार का संतुलन बनाएं।",
        faq4Question: "4. क्या मुफ्त YouTube से MP4 कनवर्टर सुरक्षित हैं?",
        faq4Answer: "हालांकि कई मुफ्त कनवर्टर्स संदिग्ध हो सकते हैं, हम आपकी सुरक्षा को गंभीरता से लेते हैं। हमारा कनवर्टर पूरी तरह से आपके ब्राउज़र में काम करता है बिना किसी संदिग्ध डाउनलोड या पॉप-अप के। हम सुरक्षित HTTPS एन्क्रिप्शन का उपयोग करते हैं और कभी भी आपकी व्यक्तिगत जानकारी या देखने का इतिहास स्टोर नहीं करते हैं। इसके अलावा, हम नियमित रूप से मैलवेयर की जांच करते हैं और अपनी सेवा को साफ रखते हैं। कोई स्पाइवेयर, कोई अतिरिक्त सॉफ़्टवेयर नहीं - केवल विश्वसनीय वीडियो कन्वर्शन।",
        faq5Question: "5. YouTube से MP4 कनवर्टर कौन उपयोग करता है?",
        faq5Answer: "हमारा कनवर्टर सभी प्रकार के उपयोगकर्ताओं के लिए आदर्श है। कंटेंट क्रिएटर्स, छात्र, शिक्षक, यात्रा करने वाले, व्यवसाय पेशेवर और सामान्य उपयोगकर्ता इसे पसंद करेंगे। आप वीडियो को बिना किसी सीमा के कनवर्ट कर सकते हैं। खाता बनाने या सॉफ़्टवेयर डाउनलोड करने की आवश्यकता नहीं है।"

    },
    pt: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "Baixador de vídeos do YouTube",
        mp3Converter: "Conversor de YouTube para MP3",
        title: "Conversor do YouTube para MP4",
        description: "Cole a URL e converta rapidamente o YouTube para MP4. Sempre gratuito, sempre funciona, sem anúncios.",
        download: "BAIXAR",
        tip: "Esteja ciente dos direitos autorais ao baixar conteúdo. Esta ferramenta não foi projetada para baixar músicas protegidas por direitos autorais.",
        formats: "Todos os formatos",
        formatsTip: "Clique para salvar",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "Como Converter Vídeo do YouTube para MP4",
        howToConvertDescription: `Cole o URL e converta rapidamente o YouTube para MP4. Sempre gratuito, sempre funciona, sem anúncios.`,
        step: "Passo",
        copyUrl: "Copiar o URL do vídeo do YouTube",
        clickDownload: "Clique diretamente no botão 'Baixar'",
        saveVideo: "Aguarde alguns minutos e salve o vídeo",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "Alta taxa de sucesso em downloads do YouTube", description: "Baixe vídeos do YouTube sem esforço com nosso conversor avançado, com taxas de sucesso líderes da indústria e preservação confiável de qualidade para todos os tipos de conteúdo." },
            { icon: require('@/assets/yt_feature2.png'), title: "Conversor YouTube para MP4 super-rápido", description: "Transforme vídeos do YouTube em arquivos MP4 de alta qualidade em segundos. Experimente downloads instantâneos sem comprometer a qualidade do vídeo." },
            { icon: require('@/assets/yt_feature3.png'), title: "100% seguro e protegido", description: "Baixe vídeos do YouTube com segurança com nosso conversor limpo e focado em privacidade. Sem rastreamento, sem malware – apenas simplicidade pura." },
            { icon: require('@/assets/yt_feature4.png'), title: "Downloads ilimitados", description: "Converta e salve quantos vídeos do YouTube quiser, sem tempo de espera ou limites irritantes de download." },
            { icon: require('@/assets/yt_feature5.png'), title: "Sem login e sem instalação de software", description: "Comece a converter vídeos sem criar contas ou baixar nada. Basta colar seu link e pronto – sem complicações." },
            { icon: require('@/assets/yt_feature6.png'), title: "Suporte a vários formatos", description: "Baixe em MP4, M4A ou WEBM. Qualquer formato ou qualidade que você deseja, nós cobrimos." }
        ],
        downloadNow: "Baixar agora >>",
        featuresConverter: "Características do Conversor de Vídeos do YouTube",
        benefits: {
            title: "Benefícios de usar o Conversor de YouTube para MP4",
            convenience: {
                title: "Conveniência e Acessibilidade",
                description: "Já aconteceu de você estar em algum lugar sem acesso à internet, desejando poder assistir seu vídeo favorito? Um conversor de YouTube para MP4 resolve esse problema."
            },
            avoidAds: {
                title: "Evitar Anúncios",
                description: "Os anúncios podem ser frustrantes, especialmente quando interrompem seus vídeos favoritos. Com um downloader de YouTube MP4, você pode pular os anúncios completamente."
            },
            saveData: {
                title: "Economizar Dados e Armazenamento",
                description: "Assistir vídeos em streaming pode rapidamente consumir seus dados móveis, especialmente se você tiver um plano limitado."
            },
            moreFromDownloads: {
                title: "Obtenha Mais com Seus Downloads",
                description: "Diga adeus ao buffer e ao consumo de dados! Aqui está como você pode aproveitar ao máximo seus vídeos offline."
            }
        },
        faqTitle: "Perguntas Frequentes",
        faq1Question: "1. É legal usar um conversor de YouTube para MP4?",
        faq1Answer: "Depende do vídeo. Você pode baixar vídeos legalmente com licença Creative Commons ou aqueles explicitamente permitidos para uso offline. Evite baixar conteúdo com direitos autorais sem permissão para se manter dentro da legalidade. Dica: Sempre verifique os termos de uso do vídeo antes de baixar.",
        faq2Question: "2. Posso usar um conversor de YouTube para MP4 no meu telefone?",
        faq2Answer: "Sim! Funciona em dispositivos móveis. Você pode usar aplicativos ou sites compatíveis com dispositivos móveis para baixar vídeos diretamente para o seu telefone. Basta colar o link do vídeo, selecionar MP4 e clicar em baixar.",
        faq3Question: "3. Qual é a melhor resolução para baixar vídeos do YouTube?",
        faq3Answer: "Depende das suas necessidades. Para uma reprodução de alta qualidade, escolha HD (720p) ou 4K. Se você estiver economizando espaço de armazenamento, escolha uma resolução mais baixa, como 480p. Dica: Equilibre qualidade e tamanho do arquivo com base na capacidade de armazenamento do seu dispositivo.",
        faq4Question: "4. Os conversores gratuitos de YouTube para MP4 são seguros?",
        faq4Answer: "Embora muitos conversores gratuitos possam ser duvidosos, levamos a sua segurança a sério. Nosso conversor funciona totalmente no seu navegador, sem downloads ou pop-ups suspeitos. Usamos criptografia HTTPS segura e nunca armazenamos seus dados pessoais ou histórico de visualização. Além disso, fazemos verificações regulares de malware e mantemos nosso serviço limpo. Sem spyware, sem bloatware - apenas conversão de vídeo confiável.",
        faq5Question: "5. Quem usa o conversor de YouTube para MP4?",
        faq5Answer: "Nosso conversor é perfeito para todos os tipos de usuários. Criadores de conteúdo, estudantes, professores, viajantes, profissionais de negócios e espectadores do dia a dia vão adorar. Você pode converter vídeos sem limites. Não é necessário criar uma conta ou baixar software."

    },
    ko: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "유튜브 비디오 다운로더",
        mp3Converter: "유튜브 MP3 변환기",
        title: "유튜브 MP4 변환기",
        description: "URL을 붙여넣고 YouTube를 MP4로 빠르게 변환하세요. 항상 무료, 항상 작동, 광고 없음.",
        download: "다운로드",
        tip: "저작권을 준수하세요. 이 도구는 저작권이 있는 음악을 다운로드하는 용도가 아닙니다.",
        formats: "모든 형식",
        formatsTip: "저장하려면 클릭하세요",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "유튜브 비디오 MP4 변환기",
        howToConvertDescription: `URL을 붙여넣고 YouTube를 MP4로 빠르게 변환하세요. 항상 무료, 항상 작동, 광고 없음.`,
        step: "단계",
        copyUrl: "유튜브 비디오 URL 복사",
        clickDownload: "‘다운로드’ 버튼을 클릭하세요",
        saveVideo: "몇 분 기다렸다가 영상을 저장하세요",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "높은 성공률의 YouTube 다운로드", description: "업계 최고의 성공률과 모든 콘텐츠 유형에 대한 신뢰할 수 있는 품질 보존 기능을 갖춘 고급 변환기를 통해 YouTube 비디오를 손쉽게 다운로드하십시오." },
            { icon: require('@/assets/yt_feature2.png'), title: "번개처럼 빠른 YouTube에서 MP4로 변환", description: "몇 초 만에 YouTube 비디오를 고품질 MP4 파일로 변환하십시오. 비디오 품질을 손상시키지 않으면서 원활하고 즉각적인 다운로드를 경험하십시오." },
            { icon: require('@/assets/yt_feature3.png'), title: "100% 안전하고 보호됨", description: "우리의 깔끔하고 개인 정보 보호에 집중된 변환기로 YouTube 비디오를 안전하게 다운로드하십시오. 추적, 악성 코드 없음 – 오직 순수한 단순함." },
            { icon: require('@/assets/yt_feature4.png'), title: "무제한 다운로드", description: "원하는 만큼 YouTube 비디오를 변환하고 저장하십시오. 대기 시간 없이 다운로드 제한도 없습니다." },
            { icon: require('@/assets/yt_feature5.png'), title: "로그인 없이 소프트웨어 설치 없이", description: "계정을 만들거나 아무것도 다운로드하지 않고 바로 비디오를 변환하십시오. 링크를 붙여넣기만 하면 준비 완료 – 번거로움 없이." },
            { icon: require('@/assets/yt_feature6.png'), title: "여러 형식 지원", description: "MP4, M4A 또는 WEBM 형식으로 다운로드하십시오. 원하는 형식이나 품질이 무엇이든 저희가 다 도와드립니다." }
        ],
        downloadNow: "지금 다운로드 >>",
        featuresConverter: "YouTube 비디오 변환기의 특징",
        benefits: {
            title: "YouTube를 MP4로 변환하는 이점",
            convenience: {
                title: "편리함과 접근성",
                description: "인터넷에 연결되지 않은 채로 좋아하는 동영상을 보고 싶었던 적이 있나요? YouTube에서 MP4로 변환기를 사용하면 이 문제를 해결할 수 있습니다."
            },
            avoidAds: {
                title: "광고 차단",
                description: "광고는 특히 좋아하는 동영상을 방해할 때 짜증날 수 있습니다. YouTube MP4 다운로더로 광고를 완전히 건너뛸 수 있습니다."
            },
            saveData: {
                title: "데이터 및 저장 공간 절약",
                description: "스트리밍 비디오는 특히 제한된 요금제에서 모바일 데이터를 빠르게 소모할 수 있습니다."
            },
            moreFromDownloads: {
                title: "다운로드에서 더 많은 것을 얻기",
                description: "버퍼링과 데이터 소모를 없애세요! 오프라인 비디오를 최대한 활용하는 방법입니다."
            }
        },
        faqTitle: "자주 묻는 질문",
        faq1Question: "1. YouTube에서 MP4 변환기를 사용하는 것이 합법인가요?",
        faq1Answer: "비디오에 따라 다릅니다. Creative Commons 라이센스를 가진 비디오나 오프라인 사용을 명시적으로 허용한 비디오는 합법적으로 다운로드할 수 있습니다. 저작권이 있는 콘텐츠를 허가 없이 다운로드하지 않도록 하여 법적 문제를 피하세요. 팁: 다운로드하기 전에 항상 비디오의 사용 약관을 확인하세요.",
        faq2Question: "2. 모바일에서 YouTube MP4 변환기를 사용할 수 있나요?",
        faq2Answer: "네! 모바일 기기에서 작동합니다. 앱이나 모바일에 최적화된 웹사이트를 사용하여 비디오를 모바일 기기로 바로 다운로드할 수 있습니다. 비디오 링크를 붙여넣고 MP4를 선택한 후 다운로드를 클릭하세요.",
        faq3Question: "3. YouTube 비디오를 다운로드할 때 가장 좋은 해상도는 무엇인가요?",
        faq3Answer: "당신의 필요에 따라 다릅니다. 고화질 재생을 원한다면 HD(720p) 또는 4K를 선택하세요. 저장 공간을 절약하려면 480p와 같은 낮은 해상도를 선택하세요. 팁: 기기의 저장 용량에 맞춰 품질과 파일 크기의 균형을 맞추세요.",
        faq4Question: "4. 무료 YouTube MP4 변환기는 안전한가요?",
        faq4Answer: "많은 무료 변환기가 의심스러울 수 있지만, 우리는 여러분의 안전을 중요하게 생각합니다. 우리의 변환기는 브라우저에서만 작동하며 의심스러운 다운로드나 팝업은 없습니다. 우리는 HTTPS 암호화를 사용하고 여러분의 개인 정보나 시청 기록을 저장하지 않습니다. 또한, 정기적으로 악성 소프트웨어를 검사하고 서비스를 청결하게 유지합니다. 스파이웨어도, 추가 프로그램도 없습니다 - 신뢰할 수 있는 비디오 변환만 제공합니다.",
        faq5Question: "5. YouTube에서 MP4 변환기를 사용하는 사람은 누구인가요?",
        faq5Answer: "우리의 변환기는 다양한 사용자를 위해 완벽합니다. 콘텐츠 제작자, 학생, 교사, 여행자, 비즈니스 전문가 및 일반 사용자가 좋아할 것입니다. 비디오를 제한 없이 변환할 수 있습니다. 계정을 만들거나 소프트웨어를 다운로드할 필요가 없습니다."

    },
    ja: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "YouTubeビデオダウンローダー",
        mp3Converter: "YouTubeからMP3への変換",
        title: "YouTubeからMP4へのコンバーター",
        description: "URLを貼り付けて、YouTubeをMP4にすばやく変換します。常に無料、常に動作、広告なし。",
        download: "ダウンロード",
        tip: "著作権を尊重してください。このツールは著作権のある音楽をダウンロードするためのものではありません。",
        formats: "すべてのフォーマット",
        formatsTip: "クリックして保存",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "YouTubeをMP4に変換する方法",
        howToConvertDescription: `URLを貼り付けて、YouTubeをMP4に素早く変換します。常に無料、常に動作、広告なし。`,
        step: "ステップ",
        copyUrl: "YouTube動画のURLをコピー",
        clickDownload: "‘ダウンロード’ボタンを直接クリック",
        saveVideo: "数分待って、動画を保存",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "高成功率のYouTubeダウンロード", description: "業界最高の成功率と、すべてのコンテンツタイプに対する信頼性のある品質保持を提供する当社の高度なコンバーターで、YouTube動画を手軽にダウンロードできます。" },
            { icon: require('@/assets/yt_feature2.png'), title: "超高速YouTubeからMP4への変換", description: "YouTube動画を数秒で高品質なMP4ファイルに変換します。動画品質を損なうことなく、シームレスで即時のダウンロードを体験できます。" },
            { icon: require('@/assets/yt_feature3.png'), title: "100％安全・安心", description: "当社のクリーンでプライバシー重視のコンバーターを使用して、YouTube動画を安全にダウンロードできます。追跡なし、マルウェアなし – ただのシンプルさ。" },
            { icon: require('@/assets/yt_feature4.png'), title: "無制限のダウンロード", description: "YouTube動画を心ゆくまで変換し、保存できます。待機時間や面倒なダウンロード制限はありません。" },
            { icon: require('@/assets/yt_feature5.png'), title: "ログインなし、ソフトウェアのインストールなし", description: "アカウント作成やダウンロードなしですぐに動画を変換できます。リンクを貼り付けるだけで準備完了 – 面倒なし。" },
            { icon: require('@/assets/yt_feature6.png'), title: "多様なフォーマット対応", description: "MP4、M4A、またはWEBMでダウンロードできます。求めるフォーマットや品質があれば、すべて対応いたします。" }
        ],
        downloadNow: "今すぐダウンロード >>",
        featuresConverter: "YouTube動画変換ツールの特徴",
        benefits: {
            title: "YouTubeからMP4に変換する利点",
            convenience: {
                title: "便利さとアクセス性",
                description: "インターネットに接続されていない場所で、好きな動画を見たくなったことはありませんか？ YouTubeからMP4へのコンバーターは、この問題を解決します。"
            },
            avoidAds: {
                title: "広告を避ける",
                description: "広告は、特に好きな動画を邪魔する時にイライラします。YouTube MP4ダウンローダーを使えば、広告を完全にスキップできます。"
            },
            saveData: {
                title: "データとストレージの節約",
                description: "動画ストリーミングは、特に制限付きのプランでは、モバイルデータを急速に消費する可能性があります。"
            },
            moreFromDownloads: {
                title: "ダウンロードからもっと得る",
                description: "バッファリングとデータ消費にさよなら！オフライン動画を最大限に活用する方法はこれです。"
            }
        },
        faqTitle: "よくある質問",
        faq1Question: "1. YouTubeからMP4に変換することは合法ですか？",
        faq1Answer: "それはビデオによります。Creative Commonsライセンスを持つビデオや、オフラインでの使用が明示的に許可されたビデオは合法的にダウンロードできます。著作権で保護されたコンテンツを許可なくダウンロードすることは避け、法的に問題を避けましょう。ヒント：ダウンロードする前に、必ずビデオの利用規約を確認してください。",
        faq2Question: "2. YouTube MP4変換器を携帯電話で使用できますか？",
        faq2Answer: "はい！モバイルデバイスでも動作します。アプリやモバイルに適したウェブサイトを使用して、動画を直接携帯電話にダウンロードできます。動画のリンクを貼り付け、MP4を選択してダウンロードをクリックしてください。",
        faq3Question: "3. YouTubeの動画をダウンロードするための最適な解像度は何ですか？",
        faq3Answer: "それはあなたのニーズに依存します。高品質な再生を求めるなら、HD(720p)や4Kを選んでください。保存容量を節約したい場合は、480pなどの低解像度を選びましょう。ヒント：デバイスのストレージ容量に応じて、品質とファイルサイズのバランスを取りましょう。",
        faq4Question: "4. 無料のYouTube MP4変換器は安全ですか？",
        faq4Answer: "多くの無料変換器は疑わしいかもしれませんが、私たちはあなたの安全を真剣に考えています。私たちの変換器は完全にブラウザーで動作し、怪しいダウンロードやポップアップはありません。HTTPS暗号化を使用しており、個人情報や視聴履歴を保存することはありません。また、定期的にマルウェアスキャンを実施して、サービスを清潔に保っています。スパイウェアや不要なソフトウェアはなく、信頼できる動画変換のみを提供します。",
        faq5Question: "5. YouTubeからMP4に変換するのは誰ですか？",
        faq5Answer: "私たちの変換器は、あらゆる種類のユーザーに最適です。コンテンツクリエーター、学生、教師、旅行者、ビジネスプロフェッショナル、そして日常的な視聴者が気に入るでしょう。制限なしで動画を変換できます。アカウントを作成したり、ソフトウェアをダウンロードする必要はありません。"

    },
    'zh-TW': {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "YouTube 視頻下載器",
        mp3Converter: "YouTube 轉 MP3",
        title: "YouTube 轉 MP4 轉換器",
        description: "貼上 URL 並快速轉換 YouTube 到 MP4。始終免費，始終可用，無廣告。",
        download: "下載",
        tip: "下載內容時請注意版權。本工具不適用於下載受版權保護的音樂。",
        formats: "所有格式",
        formatsTip: "點擊保存",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "如何將 YouTube 視頻轉換為 MP4",
        howToConvertDescription: `將 URL 貼上，快速將 YouTube 轉換為 MP4。始終免費，始終可用，無廣告。`,
        step: "步驟",
        copyUrl: "複製 YouTube 視頻 URL",
        clickDownload: "直接點擊 ‘下載’ 按鈕",
        saveVideo: "等待幾分鐘並保存視頻",
        features: [
            { icon: require('@/assets/yt_feature1.png'), title: "高成功率的 YouTube 下載", description: "透過我們先進的轉換器，提供業界最高的成功率及所有內容類型的可靠品質保持，輕鬆下載 YouTube 視頻。" },
            { icon: require('@/assets/yt_feature2.png'), title: "超高速的 YouTube 到 MP4 轉換", description: "在幾秒鐘內將 YouTube 視頻轉換為高品質 MP4 文件。無需損失視頻質量，體驗無縫且即時的下載。" },
            { icon: require('@/assets/yt_feature3.png'), title: "100% 安全可靠", description: "使用我們乾淨且注重隱私的轉換器，安全地下載 YouTube 視頻。無追蹤，無惡意軟體——僅提供簡單的體驗。" },
            { icon: require('@/assets/yt_feature4.png'), title: "無限制的下載", description: "隨心所欲地轉換和儲存 YouTube 視頻。無等待時間或麻煩的下載限制。" },
            { icon: require('@/assets/yt_feature5.png'), title: "無需登入或安裝軟體", description: "無需建立帳戶或下載，立即轉換視頻。只需貼上鏈接即可準備就緒 - 無麻煩。" },
            { icon: require('@/assets/yt_feature6.png'), title: "支持多種格式", description: "可以下載成 MP4、M4A 或 WEBM 格式。無論您需要什麼格式或品質，我們都能滿足您的需求。" }
        ],
        downloadNow: "下載 >>",
        featuresConverter: "YouTube 影片轉換器的功能",
        benefits: {
            title: "YouTube 轉 MP4 轉換器的優點",
            convenience: {
                title: "方便性和可接觸性",
                description: "曾經有過因為無法上網而無法觀看喜愛的影片的情況嗎？使用 YouTube 到 MP4 轉換器可以解決這個問題。"
            },
            avoidAds: {
                title: "避免廣告",
                description: "廣告常常會讓人感到困擾，特別是在觀看喜愛的影片時。使用 YouTube MP4 下載器，你可以完全跳過廣告。"
            },
            saveData: {
                title: "節省數據和儲存空間",
                description: "影片串流會快速消耗你的手機數據，尤其是當你使用限制性計劃時。"
            },
            moreFromDownloads: {
                title: "從下載中獲得更多",
                description: "告別緩衝和數據消耗！這是如何最大化利用你的離線影片。"
            }
        },
        faqTitle: "常見問題",
        faq1Question: "1. 使用 YouTube 轉 MP4 轉換器是否合法？",
        faq1Answer: "這取決於影片。您可以合法下載具有 Creative Commons 許可的影片或那些明確允許離線使用的影片。避免在未經許可的情況下下載受版權保護的內容，以保持合法。建議：在下載之前，請始終檢查影片的使用條款。",
        faq2Question: "2. 我可以在手機上使用 YouTube 轉 MP4 轉換器嗎？",
        faq2Answer: "是的！它可以在移動設備上使用。您可以使用適合移動設備的應用程式或網站，將影片直接下載到手機中。只需粘貼影片鏈接，選擇 MP4，然後點擊下載。",
        faq3Question: "3. 下載 YouTube 影片的最佳解析度是什麼？",
        faq3Answer: "這取決於您的需求。如果您想要高質量的播放，選擇 HD（720p）或 4K。如果您想節省存儲空間，可以選擇 480p 等較低解析度。建議：根據您的設備儲存容量，平衡質量和文件大小。",
        faq4Question: "4. 免費的 YouTube 轉 MP4 轉換器安全嗎？",
        faq4Answer: "儘管許多免費轉換器可能存在風險，但我們非常重視您的安全。我们的转换器完全在您的浏览器中运行，不会有可疑的下载或弹出窗口。我们使用 HTTPS 加密，并且从不保存您的个人数据或观看历史记录。此外，我们定期检查恶意软件，并保持我们的服务干净。没有间谍软件，没有额外的程序 - 只有值得信赖的视频转换。",
        faq5Question: "5. YouTube 轉 MP4 轉換器是誰在使用？",
        faq5Answer: "我們的轉換器非常適合各種類型的使用者。內容創作者、學生、教師、旅遊者、商業專業人士和日常觀眾都會喜歡。您可以無限制地轉換影片。無需創建帳戶或下載軟件。"

    },
    id: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "Pengunduh Video YouTube",
        mp3Converter: "Konverter YouTube ke MP3",
        title: "Pengonversi YouTube ke MP4",
        description: "Tempel URL dan Konversi YouTube ke MP4 dengan cepat. Selalu gratis, selalu berfungsi, tanpa iklan.",
        download: "UNDUH",
        tip: "Harap perhatikan hak cipta saat mengunduh konten. Alat ini tidak dirancang untuk mengunduh musik berhak cipta.",
        formats: "Semua format",
        formatsTip: "Klik untuk menyimpan",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "Cara Mengonversi Video YouTube ke MP4",
        howToConvertDescription: `Tempelkan URL dan cepat mengonversi YouTube ke MP4. Selalu gratis, selalu berfungsi, tanpa iklan.`,
        step: "Langkah",
        copyUrl: "Salin URL Video YouTube",
        clickDownload: "Klik langsung tombol 'Unduh'",
        saveVideo: "Tunggu beberapa menit dan simpan video",
        featuresConverter: "Fitur Pengonversi Video YouTube",
        benefits: {
            title: "Manfaat Menggunakan Konverter YouTube ke MP4",
            convenience: {
                title: "Kenyamanan dan Aksesibilitas",
                description: "Pernahkah Anda terjebak di suatu tempat tanpa akses internet dan ingin menonton video favorit Anda?"
            },
            avoidAds: {
                title: "Hindari Iklan",
                description: "Iklan bisa sangat mengganggu, terutama ketika mengganggu video favorit Anda."
            },
            saveData: {
                title: "Hemat Data dan Penyimpanan",
                description: "Menonton video melalui streaming dapat dengan cepat menghabiskan data ponsel Anda."
            },
            moreFromDownloads: {
                title: "Dapatkan Lebih Banyak Dari Unduhan Anda",
                description: "Katakan selamat tinggal pada buffering dan pengurasan data! Inilah cara memaksimalkan video offline Anda."
            }
        },
        faqTitle: "Pertanyaan yang Sering Diajukan",
        faq1Question: "1. Apakah menggunakan konverter YouTube ke MP4 itu legal?",
        faq1Answer: "Tergantung pada videonya. Anda dapat mengunduh video secara sah yang memiliki lisensi Creative Commons atau yang secara eksplisit diizinkan untuk penggunaan offline. Hindari mengunduh konten berhak cipta tanpa izin untuk tetap berada di sisi hukum. Tip: Selalu periksa ketentuan penggunaan video sebelum mengunduh.",
        faq2Question: "2. Bisakah saya menggunakan konverter YouTube ke MP4 di ponsel saya?",
        faq2Answer: "Ya! Ini berfungsi di perangkat seluler. Anda dapat menggunakan aplikasi atau situs web yang ramah seluler untuk mengunduh video langsung ke ponsel Anda. Cukup tempelkan tautan video, pilih MP4, dan tekan unduh.",
        faq3Question: "3. Apa resolusi terbaik untuk mengunduh video YouTube?",
        faq3Answer: "Tergantung pada kebutuhan Anda. Untuk pemutaran kualitas tinggi, pilih HD (720p) atau 4K. Jika Anda menghemat ruang penyimpanan, pilih resolusi lebih rendah seperti 480p. Tip: Seimbangkan kualitas dan ukuran file berdasarkan kapasitas penyimpanan perangkat Anda.",
        faq4Question: "4. Apakah konverter YouTube ke MP4 gratis aman?",
        faq4Answer: "Meskipun banyak konverter gratis yang mencurigakan, kami sangat peduli dengan keamanan Anda. Konverter kami sepenuhnya berjalan di browser Anda tanpa unduhan atau pop-up mencurigakan. Kami menggunakan enkripsi HTTPS yang aman dan tidak pernah menyimpan data pribadi atau riwayat tontonan Anda. Selain itu, kami secara teratur memeriksa malware dan menjaga layanan kami tetap bersih. Tidak ada perangkat lunak mata-mata, tidak ada perangkat lunak tambahan - hanya konversi video yang dapat dipercaya.",
        faq5Question: "5. Siapa yang menggunakan konverter YouTube ke MP4?",
        faq5Answer: "Konverter kami sempurna untuk berbagai pengguna. Pembuat konten, pelajar, guru, pelancong, profesional bisnis, dan penonton sehari-hari akan menyukainya. Anda dapat mengonversi video tanpa batasan. Tidak perlu membuat akun atau mengunduh perangkat lunak."

    },
    th: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "ตัวดาวน์โหลดวิดีโอ YouTube",
        mp3Converter: "ตัวแปลง YouTube เป็น MP3",
        title: "ตัวแปลง YouTube เป็น MP4",
        description: "วาง URL และแปลง YouTube เป็น MP4 อย่างรวดเร็ว ฟรีเสมอ ใช้งานได้เสมอ ไม่มีโฆษณา",
        download: "ดาวน์โหลด",
        tip: "โปรดคำนึงถึงลิขสิทธิ์เมื่อดาวน์โหลดเนื้อหา เครื่องมือนี้ไม่ได้ออกแบบมาเพื่อดาวน์โหลดเพลงที่มีลิขสิทธิ์",
        formats: "รูปแบบทั้งหมด",
        formatsTip: "คลิกเพื่อบันทึก",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "วิธีการแปลงวิดีโอ YouTube เป็น MP4",
        howToConvertDescription: `วาง URL และแปลง YouTube เป็น MP4 อย่างรวดเร็ว ฟรีเสมอ ใช้งานได้เสมอ ไม่มีโฆษณา`,
        step: "ขั้นตอน",
        copyUrl: "คัดลอก URL วิดีโอ YouTube",
        clickDownload: "คลิกตรงปุ่ม 'ดาวน์โหลด'",
        saveVideo: "รอไม่กี่นาทีแล้วบันทึกวิดีโอ",
        featuresConverter: "คุณสมบัติของตัวแปลงวิดีโอ YouTube",
        benefits: {
            title: "ประโยชน์ของการใช้ YouTube ไปยัง MP4 Converter",
            convenience: {
                title: "ความสะดวกสบายและการเข้าถึง",
                description: "เคยตกอยู่ในสถานการณ์ที่ไม่สามารถเข้าถึงอินเทอร์เน็ตได้และอยากดูวิดีโอที่คุณชื่นชอบไหม?"
            },
            avoidAds: {
                title: "หลีกเลี่ยงโฆษณา",
                description: "โฆษณาสามารถทำให้รู้สึกหงุดหงิดโดยเฉพาะเมื่อมันขัดจังหวะวิดีโอที่คุณชื่นชอบ"
            },
            saveData: {
                title: "ประหยัดข้อมูลและพื้นที่เก็บข้อมูล",
                description: "การสตรีมวิดีโอสามารถใช้ข้อมูลมือถือของคุณได้เร็ว โดยเฉพาะหากคุณใช้แผนที่จำกัด"
            },
            moreFromDownloads: {
                title: "ได้มากขึ้นจากการดาวน์โหลดของคุณ",
                description: "บอกลาการบัฟเฟอร์และการใช้ข้อมูล! นี่คือวิธีการใช้งานวิดีโอออฟไลน์ให้เกิดประโยชน์สูงสุด"
            }
        },
        faqTitle: "คำถามที่พบบ่อย",
        faq1Question: "1. การใช้ตัวแปลง YouTube เป็น MP4 ถูกต้องตามกฎหมายหรือไม่?",
        faq1Answer: "ขึ้นอยู่กับวิดีโอ คุณสามารถดาวน์โหลดวิดีโออย่างถูกต้องตามกฎหมายที่มีใบอนุญาต Creative Commons หรือวิดีโอที่ได้รับอนุญาตอย่างชัดเจนสำหรับการใช้งานแบบออฟไลน์ หลีกเลี่ยงการดาวน์โหลดเนื้อหาที่มีลิขสิทธิ์โดยไม่ได้รับอนุญาตเพื่อหลีกเลี่ยงปัญหาทางกฎหมาย คำแนะนำ: ตรวจสอบเงื่อนไขการใช้งานของวิดีโอก่อนดาวน์โหลดเสมอ",
        faq2Question: "2. ฉันสามารถใช้ตัวแปลง YouTube เป็น MP4 บนโทรศัพท์ของฉันได้หรือไม่?",
        faq2Answer: "ได้! มันทำงานบนอุปกรณ์เคลื่อนที่ คุณสามารถใช้แอปหรือเว็บไซต์ที่เหมาะสมกับมือถือเพื่อดาวน์โหลดวิดีโอโดยตรงไปยังโทรศัพท์ของคุณ เพียงแค่ใส่ลิงก์วิดีโอ เลือก MP4 และกดดาวน์โหลด",
        faq3Question: "3. ความละเอียดที่ดีที่สุดในการดาวน์โหลดวิดีโอจาก YouTube คืออะไร?",
        faq3Answer: "มันขึ้นอยู่กับความต้องการของคุณ หากคุณต้องการการเล่นวิดีโอคุณภาพสูง ให้เลือก HD (720p) หรือ 4K หากคุณต้องการประหยัดพื้นที่จัดเก็บ ให้เลือกความละเอียดต่ำกว่านี้เช่น 480p คำแนะนำ: จับคู่คุณภาพและขนาดไฟล์ตามความจุของอุปกรณ์ของคุณ",
        faq4Question: "4. ตัวแปลง YouTube เป็น MP4 ฟรีปลอดภัยหรือไม่?",
        faq4Answer: "แม้ว่าตัวแปลงฟรีหลายตัวอาจน่าสงสัย แต่เราคำนึงถึงความปลอดภัยของคุณอย่างจริงจัง ตัวแปลงของเราทำงานทั้งหมดในเบราว์เซอร์ของคุณโดยไม่ต้องดาวน์โหลดหรือป๊อปอัพที่น่าสงสัย เราใช้การเข้ารหัส HTTPS ที่ปลอดภัยและไม่เคยเก็บข้อมูลส่วนตัวหรือประวัติการรับชมของคุณ นอกจากนี้เรายังตรวจสอบมัลแวร์อย่างสม่ำเสมอและรักษาบริการของเราให้สะอาด ไม่มีซอฟต์แวร์สปายแวร์ ไม่มีซอฟต์แวร์เพิ่มเติม - เพียงการแปลงวิดีโอที่เชื่อถือได้",
        faq5Question: "5. ใครใช้ตัวแปลง YouTube เป็น MP4?",
        faq5Answer: "ตัวแปลงของเราเหมาะสำหรับผู้ใช้ทุกประเภท ผู้สร้างเนื้อหา นักเรียน อาจารย์ นักเดินทาง นักธุรกิจ และผู้ชมทั่วไปจะชื่นชอบ คุณสามารถแปลงวิดีโอได้โดยไม่จำกัด ไม่จำเป็นต้องสร้างบัญชีหรือดาวน์โหลดซอฟต์แวร์"

    },
    vi: {
        siteName: "Youtubetomp4.pro",
        videoDownloader: "Trình tải xuống video YouTube",
        mp3Converter: "Trình chuyển đổi YouTube sang MP3",
        title: "Bộ chuyển đổi YouTube sang MP4",
        description: "Dán URL và nhanh chóng chuyển đổi YouTube sang MP4. Luôn miễn phí, luôn hoạt động, không có quảng cáo.",
        download: "TẢI XUỐNG",
        tip: "Vui lòng tôn trọng bản quyền khi tải xuống nội dung. Công cụ này không được thiết kế để tải nhạc có bản quyền.",
        formats: "Tất cả định dạng",
        formatsTip: "Nhấp để lưu",
        reviews: [
            { text: "Perfeito para salvar meus vídeos favoritos! Downloads rápidos e super simples de usar. Não é necessário registro.", author: "Sarah_Bennett92" },
            { text: "Esta ferramenta é ótima! Eu adoro como é fácil baixar vídeos em vários formatos.", author: "John_Doe" },
            { text: "Eu uso isso há meses, e sempre funciona perfeitamente.", author: "Jane_Smith" },
            { text: "Rápido e confiável. O melhor downloader de vídeos!", author: "Michael_Johnson" },
            { text: "Fácil de usar e muito eficaz para salvar conteúdo.", author: "David_Lee" },
            { text: "Altamente recomendado! Funciona perfeitamente com todos os meus vídeos.", author: "Emma_Wilson" }
        ],
        howToConvertTitle: "Cách chuyển đổi video YouTube thành MP4",
        howToConvertDescription: `Dán URL và nhanh chóng chuyển đổi YouTube thành MP4. Luôn miễn phí, luôn hoạt động, không có quảng cáo.`,
        step: "Bước",
        copyUrl: "Sao chép URL video YouTube",
        clickDownload: "Nhấp vào nút 'Tải xuống'",
        saveVideo: "Chờ vài phút và lưu video",
        featuresConverter: "Tính năng của Trình chuyển đổi Video YouTube",
        benefits: {
            title: "Lợi ích của việc sử dụng YouTube để MP4 Converter",
            convenience: {
                title: "Sự tiện lợi và khả năng truy cập",
                description: "Bạn đã từng bị mắc kẹt ở đâu đó mà không có internet và mong muốn có thể xem video yêu thích của mình?"
            },
            avoidAds: {
                title: "Tránh Quảng Cáo",
                description: "Quảng cáo có thể gây khó chịu, đặc biệt là khi chúng làm gián đoạn video yêu thích của bạn."
            },
            saveData: {
                title: "Tiết kiệm Dữ liệu và Lưu trữ",
                description: "Xem video trực tuyến có thể nhanh chóng làm tiêu tốn dữ liệu di động của bạn."
            },
            moreFromDownloads: {
                title: "Nhận nhiều hơn từ các Tải xuống của bạn",
                description: "Tạm biệt tải chậm và tốn dữ liệu! Đây là cách bạn có thể tối đa hóa video ngoại tuyến của mình."
            }
        },
        faqTitle: "Câu hỏi thường gặp",
        faq1Question: "1. Sử dụng công cụ chuyển đổi YouTube sang MP4 có hợp pháp không?",
        faq1Answer: "Điều này phụ thuộc vào video. Bạn có thể tải video hợp pháp có giấy phép Creative Commons hoặc những video được phép rõ ràng để sử dụng ngoại tuyến. Tránh tải video có bản quyền mà không có sự cho phép để không vi phạm pháp luật. Mẹo: Luôn kiểm tra điều khoản sử dụng video trước khi tải xuống.",
        faq2Question: "2. Tôi có thể sử dụng công cụ chuyển đổi YouTube sang MP4 trên điện thoại không?",
        faq2Answer: "Có! Nó hoạt động trên các thiết bị di động. Bạn có thể sử dụng ứng dụng hoặc các trang web thân thiện với di động để tải video trực tiếp xuống điện thoại của mình. Chỉ cần dán liên kết video, chọn MP4 và nhấn tải xuống.",
        faq3Question: "3. Độ phân giải tốt nhất để tải video YouTube là gì?",
        faq3Answer: "Điều này tùy thuộc vào nhu cầu của bạn. Nếu bạn muốn phát lại chất lượng cao, chọn HD (720p) hoặc 4K. Nếu bạn muốn tiết kiệm dung lượng lưu trữ, chọn độ phân giải thấp hơn như 480p. Mẹo: Cân bằng chất lượng và kích thước tệp dựa trên dung lượng lưu trữ của thiết bị của bạn.",
        faq4Question: "4. Công cụ chuyển đổi YouTube sang MP4 miễn phí có an toàn không?",
        faq4Answer: "Mặc dù nhiều công cụ chuyển đổi miễn phí có thể đáng nghi ngờ, chúng tôi rất coi trọng sự an toàn của bạn. Công cụ chuyển đổi của chúng tôi hoàn toàn hoạt động trong trình duyệt của bạn mà không cần tải xuống hoặc pop-up đáng ngờ. Chúng tôi sử dụng mã hóa HTTPS an toàn và không bao giờ lưu trữ dữ liệu cá nhân hoặc lịch sử xem của bạn. Ngoài ra, chúng tôi kiểm tra phần mềm độc hại thường xuyên và giữ dịch vụ của mình sạch sẽ. Không có phần mềm gián điệp, không có phần mềm thêm vào - chỉ có chuyển đổi video đáng tin cậy.",
        faq5Question: "5. Ai sử dụng công cụ chuyển đổi YouTube sang MP4?",
        faq5Answer: "Công cụ chuyển đổi của chúng tôi lý tưởng cho tất cả các loại người dùng. Những người sáng tạo nội dung, sinh viên, giáo viên, du khách, chuyên gia kinh doanh và người xem bình thường sẽ yêu thích nó. Bạn có thể chuyển đổi video mà không giới hạn. Không cần phải tạo tài khoản hoặc tải xuống phần mềm."

    },
};

// **自动检测浏览器语言**
const lang = navigator.language;
const browserLang = lang.split("-")[0]; // 获取 `zh-CN` 的 `zh`
const defaultLang = messages[browserLang] ? browserLang : (messages[lang] ?  lang : "en"); // 优先匹配 Main Language，如果匹配不到则匹配次级语言，兜底使用英语

console.log("defaultLang", defaultLang);

const i18n = createI18n({
    locale: defaultLang, // 默认语言
    fallbackLocale: "en", // 兜底使用英语
    messages,
});

export default i18n;
