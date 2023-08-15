mkdir -p ./temp/cfx-i18next
cp ./{fxmanifest.lua,LICENSE,README.md} ./temp/cfx-i18next
cp -r ./dist ./temp/cfx-i18next
cd ./temp && zip -r ../cfx-i18next.zip ./cfx-i18next
cd .. && rm -rf ./temp
