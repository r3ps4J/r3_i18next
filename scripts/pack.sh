mkdir -p ./temp/r3_i18next
cp ./{fxmanifest.lua,LICENSE,README.md} ./temp/r3_i18next
cp -r ./dist ./temp/r3_i18next
cd ./temp && zip -r ../r3_i18next.zip ./r3_i18next
cd .. && rm -rf ./temp
