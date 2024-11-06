import { Octokit } from 'octokit'

async function loadDownloadLinks() {
  const octokit = new Octokit()

  const r = await octokit.request('GET /repos/cardo-podcast/cardo/releases/latest', {
    owner: 'OWNER',
    repo: 'REPO',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  for (const release of r.data.assets) {
    if (release.name.endsWith('.msi')) {
      document.getElementById('msi')?.setAttribute('href', release.browser_download_url)
    } else if (release.name.endsWith('.exe')) {
      document.getElementById('exe')?.setAttribute('href', release.browser_download_url)
    } else if (release.name.endsWith('aarch64.dmg')) {
      document.getElementById('aarch64_dmg')?.setAttribute('href', release.browser_download_url)
    } else if (release.name.endsWith('x64.dmg')) {
      document.getElementById('x64_dmg')?.setAttribute('href', release.browser_download_url)
    } else if (release.name.endsWith('.AppImage')) {
      document.getElementById('appimage')?.setAttribute('href', release.browser_download_url)
    } else if (release.name.endsWith('.deb')) {
      document.getElementById('deb')?.setAttribute('href', release.browser_download_url)
    } else if (release.name.endsWith('.rpm')) {
      document.getElementById('rpm')?.setAttribute('href', release.browser_download_url)
    }
  }
}

loadDownloadLinks()
