function loadCDN(type, url) {
    return new Promise((resolve, reject) => {
        // ตรวจสอบว่าโหลดแล้วหรือยัง
        if (type === 'css') {
            // ตรวจสอบว่า CSS โหลดแล้วหรือยัง
            if (document.querySelector(`link[href="${url}"]`)) {
                console.log(`CSS already loaded: ${url}`);
                return resolve();
            }
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = () => {
                resolve();
            };
            link.onerror = () => {
                console.error(`Failed to load CSS: ${url}`);
                reject(new Error(`Failed to load CSS: ${url}`));
            };
            document.head.appendChild(link);
        } else if (type === 'js') {
            // ตรวจสอบว่า JS โหลดแล้วหรือยัง
            if (document.querySelector(`script[src="${url}"]`)) {
                console.log(`Script already loaded: ${url}`);
                return resolve();
            }
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
                resolve();
            };
            script.onerror = () => {
                console.error(`Failed to load script: ${url}`);
                reject(new Error(`Failed to load script: ${url}`));
            };
            document.body.appendChild(script);
        } else {
            reject(new Error(`Unsupported type: ${type}. Use 'css' or 'js'`));
        }
    });
}

loadCDN('css', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css')
loadCDN('js', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js')

async function loadComponent(id, filename) {
    const el = document.getElementById(id);
    if (!el) {
        console.log(`Element with id '${id}' not found`);
        return;
    }
    try {
        const res = await fetch(`/assets/components/${filename}`);
        const html = await res.text();
        el.innerHTML = html;
        // ...existing code...
    } catch (err) {
        console.error(`Failed to load component '${filename}':`, err);
    }
}

loadComponent('navbar', 'navbar.html').then(() => {
    const token = false;
    if (token) {
        document.getElementById('dashboard').classList.remove('d-none');
        document.getElementById('logout').classList.remove('d-none');
        document.getElementById('login').classList.add('d-none');
        document.getElementById('register').classList.add('d-none');
    } else {
        document.getElementById('login').classList.remove('d-none');
        document.getElementById('register').classList.remove('d-none');
        document.getElementById('dashboard').classList.add('d-none');
        document.getElementById('logout').classList.add('d-none');
    }
}).catch((error) => {
    console.error('Failed to load component:', error);
});

loadComponent('footer', 'footer.html')