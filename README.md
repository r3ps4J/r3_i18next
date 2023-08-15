# r3_i18next

![](https://img.shields.io/github/downloads/r3ps4J/r3_i18next/total?logo=github)
![](https://img.shields.io/github/downloads/r3ps4J/r3_i18next/latest/total?logo=github)
![](https://img.shields.io/github/contributors/r3ps4J/r3_i18next?logo=github)
![](https://img.shields.io/github/v/release/r3ps4J/r3_i18next?logo=github) 

This is a wrapper resource for the popular internationalization framework i18next. This resource provides exports allowing you to create new i18next instances for use in other resources.

![r3_i18next](/assets/r3_i18next-slim.png)

i18next provides a wide range of features, such as:

- Proper [pluralizations](https://www.i18next.com/translation-function/plurals)
- Translation [context](https://www.i18next.com/translation-function/context)
- [Nesting](https://www.i18next.com/translation-function/nesting) and [Variable replacement](https://www.i18next.com/translation-function/interpolation)
- Flexibility: You can use i18next with many [frontend frameworks](https://www.i18next.com/overview/supported-frameworks) and plain javascript, allowing you to share translations between your script and UI

For more information about i18next, check out their documentation on [www.i18next.com](https://www.i18next.com/).

## Download

https://github.com/r3ps4J/r3_i18next/releases/latest/download/r3_i18next.zip

## Usage

Follow this guide to get your resource set-up for using r3_i18next.

If you plan on using this in a Javascript or Typescript resource, it is recommended to install i18next directly. If you wish to make use of the modules that this wrapper can provide please take a look at the repositories of these modules and install them directly as well.

Modules used:
 - Language detector: [@r3ps4j/i18next-fxserver-language-detector](https://github.com/r3ps4J/i18next-fxserver-language-detector)
 - Backend: [@r3ps4j/i18next-fxserver-backend](https://github.com/r3ps4J/i18next-fxserver-backend)

### Mark as r3_i18next as a dependency

The first step to using r3_i18next is to mark it as a dependency in the manifest of the resource in which you plan on using it. This will ensure that r3_i18next is started before your resource, preventing the "No such export x in resource r3_i18next" error from occurring.

Mark r3_i18next as a dependency in `fxmanifest.lua`:

```lua
-- fxmanifest.lua
dependency "r3_i18next"

-- Or as an array
dependencies {
    "r3_i18next",
}
```

### Creating an instance

The next step to start using r3_i18next is to create a new i18next instance. You can do this by calling the `createInstance` or `createInstanceWithPlugins` export. These exports are available on both the server and client side.

Create a new instance:
```lua
i18next = exports["r3_i18next"]:createInstance()
```

Because `i18next.use` does not work on an instance created through exports, the `createInstanceWithPlugins` is provided as well. By default this export will provide the [@r3ps4j/i18next-fxserver-language-detector](https://github.com/r3ps4J/i18next-fxserver-language-detector) and [@r3ps4j/i18next-fxserver-backend](https://github.com/r3ps4J/i18next-fxserver-backend) modules, but this can be altered by providing the list of modules as a paramter to the export.

Create a new instance with platform specific modules:
```lua
-- Default instance with platform specific modules
i18next = exports["r3_i18next"]:createInstanceWithPlugins()

-- Specify modules
i18next = exports["r3_i18next"]:createInstanceWithPlugins({"language-detector", "backend"})
```

### Initialization

After creating the instance you will have to initialize it, during this you will be able to configure the instance to your liking.

#### Basic sample

This is a basic sample showing only the basic usage of i18next core functionality (`print` is just done to show how it works).

```lua
i18next = exports["r3_i18next"]:createInstance()

i18next.init({
    lng = "en", -- if you're using a language detector, do not define the lng option
    debug = true,
    resources = {
        en = {
            translation = {
                ["key"] = "hello world"
            }
        }
    }
})

-- initialized and ready to go!
-- i18next is already initialized, because the translation resources where passed via init function
print(i18next.t('key'))
```

Or using callback init signature:

```lua
i18next = exports["r3_i18next"]:createInstance()

i18next.init({
    lng = "en", -- if you're using a language detector, do not define the lng option
    debug = true,
    resources = {
        en = {
            translation = {
                ["key"] = "hello world"
            }
        }
    }
}, function(err, t)
    -- initialized and ready to go!
    print(i18next.t('key'))
end)
```

### Further setup

You should now have an idea about how to achieve the basic setup. For more configuration options please refer to the [i18next documentation](https://www.i18next.com/overview/configuration-options).

## Using the platform specific modules

As indicated earlier, this wrapper provides some platform specific modules for use with FXServer resources. These modules are completely optional to use, but are recommended to simply your development process.

### Language detector

The [language detector module](https://github.com/r3ps4J/i18next-fxserver-language-detector) looks at convars to determine what language should be used to translate keys. By default it will look at the "i18next_lng" convar, but this can be changed in the detector options. If the convar is not found or empty, it will resort to the "locale" convar. This convar should already be set to specify the server language in the server list.

#### Basic sample with language detector:

```lua
i18next = exports["r3_i18next"]:createInstanceWithPlugins({"language-detector"})

i18next.init({
    fallbackLng = "en",
    debug = true,
    resources = {
        en = {
            translation = {
                ["key"] = "hello world"
            }
        }
    },
    detection = {
        convar = "i18next_lng"
    }
})

-- initialized and ready to go!
-- i18next is already initialized, because the translation resources where passed via init function
print(i18next.t('key'))
```

For more information about the language detector, check out [@r3ps4j/i18next-fxserver-language-detector](https://github.com/r3ps4J/i18next-fxserver-language-detector).

### Backend

The [backend module](https://github.com/r3ps4J/i18next-fxserver-language-detector) loads resources from the files of the invoking resource using the `LoadResourceFile` native. By default it will load files using the "/locales/{{lng}}/{{ns}}.json" loadpath, but this path can be changed in the backend options.

```lua
i18next = exports["r3_i18next"]:createInstanceWithPlugins({"backend"})

i18next.init({
    lng = "en", -- if you're using a language detector, do not define the lng option
    debug = true,
    backend = {
        loadPath = "/locales/{{lng}}/{{ns}}.json"
    }
}, function(err, t)
    -- initialized and ready to go!
    print(i18next.t('key'))
end)
```

Please make sure that the translation files are available on the client side if  you wish to use them in client scripts. You can add the files to your resource by specifying them in your resource manifest:

```lua
-- fxmanifest.lua
file "locales/**/*.json"

-- Or as an array
files {
    "locales/**/*.json",
}
```

For more information about the backend, check out [@r3ps4j/i18next-fxserver-backend](https://github.com/r3ps4J/i18next-fxserver-backend).

## Full example
```lua
i18next = exports["r3_i18next"].createInstanceWithPlugins()

i18next.init({
    fallbackLng = "en",
    detection = {
        convar = "i18next_lng"
    },
    backend = {
        loadPath = "/locales/{{lng}}/{{ns}}.json"
    },
}, function(err, t)
    -- initialized and ready to go!
    print(i18next.t('key'))
end)
```
