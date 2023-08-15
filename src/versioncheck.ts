import fetch from "cross-fetch";

function getResourceVersion(): string | false {
    const currentVersion = GetResourceMetadata("cfx-i18next", "version", 0);
    if (!currentVersion) {
        return false;
    }
    return `v${currentVersion}`;
}

async function versioncheck(): Promise<void> {
    if (GetConvarInt("i18next_versioncheck", 1) == 0) return;

    const currentVersion = getResourceVersion();

    if (!currentVersion) {
        console.log("^3Could not determine cfx-i18next resource version, version check aborted.^0");
        return;
    }

    const response = await fetch("https://api.github.com/repos/r3ps4J/cfx-i18next/releases/latest");
    if (response.status != 200) return;

    const data = await response.json();
    if (data.name == currentVersion) return;

    console.log(
        `^3An update is available for cfx-i18next (current version: ${currentVersion}, latest version: ${data.name})` +
            `\r\n${data.html_url}^0`
    );
}

versioncheck();
