### Alfonsine Algorithm implementation
_Needs Node.JS environment to run!_

Available scripts:
 * **run** - runs console implementation  
   _NB! accepts command line argument - an escaped JSON string of input data (see [./schemas/input.schema.json](https://github.com/pseusys/alfonsine/blob/master/schemas/input.schema.json))_
 * **build** - generates website source code in ./build folder
 * **dev-build** - same as build, but in webpack _development_ mode
 * **test** - run mocha tests for all algorithm scripts

Website is constantly available under [this link](https://pseusys.github.io/alfonsine/simple.html).

Running the algorithm in console:
```shell
$ npm run run "{\"date_time\": -15679518137,\"diff_hours\": 0,\"diff_minutes\": 0,\"east\": true,\"accuracy\": 10,\"epoch\": \"CHRIST\",\"precession\": \"TREPIDATION\"}"
{
  "sun": {
    "astronomic": {
      "degrees": 340,
      "minutes": 41
    },
    "astrologic": {
      "degrees": 10,
      "minutes": 41
    },
    "sign": "PISCES",
    "latitude": {
      "degrees": 0,
      "minutes": 0
    }
  },
  "moon": {
    "astronomic": {
      "degrees": 246,
      "minutes": 19
    },
    "astrologic": {
      "degrees": 6,
      "minutes": 19
    },
    "sign": "SAGITTARIUS",
    "latitude": {
      "degrees": 1,
      "minutes": 0
    },
    "north": true
  },
  "mercury": {
    "astronomic": {
      "degrees": 0,
      "minutes": 4
    },
    "astrologic": {
      "degrees": 0,
      "minutes": 4
    },
    "sign": "ARIES",
    "latitude": {
      "degrees": 2,
      "minutes": 43
    },
    "north": true
  },
  "venus": {
    "astronomic": {
      "degrees": 8,
      "minutes": 3
    },
    "astrologic": {
      "degrees": 8,
      "minutes": 3
    },
    "sign": "ARIES",
    "latitude": {
      "degrees": 0,
      "minutes": 55
    },
    "north": false
  },
  "mars": {
    "astronomic": {
      "degrees": 322,
      "minutes": 44
    },
    "astrologic": {
      "degrees": 22,
      "minutes": 44
    },
    "sign": "AQUARIUS",
    "latitude": {
      "degrees": 0,
      "minutes": 13
    },
    "north": false
  },
  "jupiter": {
    "astronomic": {
      "degrees": 243,
      "minutes": 23
    },
    "astrologic": {
      "degrees": 3,
      "minutes": 23
    },
    "sign": "SAGITTARIUS",
    "latitude": {
      "degrees": 1,
      "minutes": 15
    },
    "north": true
  },
  "saturn": {
    "astronomic": {
      "degrees": 80,
      "minutes": 11
    },
    "astrologic": {
      "degrees": 20,
      "minutes": 11
    },
    "sign": "GEMINI",
    "latitude": {
      "degrees": 1,
      "minutes": 9
    },
    "north": false
  }
}
```

Further research link:  
[Office Scripts (for office 365 only), in .TS](https://github.com/OfficeDev/office-scripts-docs/blob/master/docs/tutorials/excel-power-automate-trigger.md)
