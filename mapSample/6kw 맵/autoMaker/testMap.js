module.exports = {
  "MAP": {
    "MapSizeX": 880,
    "MapSizeY": 1230,
    "ImgObjList": [
      {
        "ID": "Reservoir",
        "ImgData": {
          "Type": "Rect",
          "Width": 100,
          "Height": 150,
          "Color": "#33ffff"
        }
      },
      {
        "ID": "SaltPlate_A",
        "ImgData": {
          "Type": "Rect",
          "Width": 200,
          "Height": 200,
          "Color": "#f8f8f8"
        }
      },
      {
        "ID": "SaltPlate_B",
        "ImgData": {
          "Type": "Rect",
          "Width": 200,
          "Height": 200,
          "Color": "#c4c8c3"
        }
      },
      {
        "ID": "SaltPlate_C",
        "ImgData": {
          "Type": "Rect",
          "Width": 200,
          "Height": 200,
          "Color": "#c4c8c3"
        }
      },
      {
        "ID": "SaltPondLine_A",
        "ImgData": {
          "Type": "Line",
          "StrokeWidth": 40,
          "Color": "#33ccff"
        }
      },
      {
        "ID": "WaterTank_A",
        "ImgData": {
          "Type": "Rect",
          "Width": 100,
          "Height": 110,
          "Color": "#dbdbdb"
        }
      },
      {
        "ID": "WaterDoor_A",
        "ImgData": {
          "Type": "Rect",
          "Width": 40,
          "Height": 40,
          "Color": "#9eb0d4"
        }
      },
      {
        "ID": "WaterDoor_B",
        "ImgData": {
          "Type": "Rect",
          "Width": 40,
          "Height": 40,
          "Color": "#3cc8c8"
        }
      },
      {
        "ID": "WaterOut_A",
        "ImgData": {
          "Type": "Rect",
          "Width": 820,
          "Height": 100,
          "Color": "#a5d8f0"
        }
      },
      {
        "ID": "WaterOut_B",
        "ImgData": {
          "Type": "Rect",
          "Width": 100,
          "Height": 200,
          "Color": "#a5d8f0"
        }
      },
      {
        "ID": "Pump_A",
        "ImgData": {
          "Type": "Circle",
          "Radius": 20,
          "Color": "#9fe667"
        }
      },
      {
        "ID": "PipeList_A",
        "ImgData": {
          "Type": "Line",
          "StrokeWidth": 2.5,
          "Color": "#cd4275"
        }
      },
      {
        "ID": "Valve_A",
        "ImgData": {
          "Type": "Squares",
          "fontsizte": 12,
          "Radius": 20,
          "Color": "#efb4ce"
        }
      },
      {
        "ID": "Valve_B",
        "ImgData": {
          "Type": "Squares",
          "fontsizte": 12,
          "Radius": 20,
          "Color": "#329033"
        }
      },
      {
        "ID": "WLSensor",
        "ImgData": {
          "Type": "Rect",
          "Width": 45,
          "Height": 20,
          "Color": "#FFFFFF"
        }
      },
      {
        "ID": "SRSensor",
        "ImgData": {
          "Type": "Rect",
          "Width": 45,
          "Height": 20,
          "Color": "#FFFFFF"
        }
      },
      {
        "ID": "UWTemperature",
        "ImgData": {
          "Type": "Rect",
          "Width": 60,
          "Height": 20,
          "Color": "#FFFFFF"
        }
      },
      {
        "ID": "MTemperature",
        "ImgData": {
          "Type": "Rect",
          "Width": 60,
          "Height": 20,
          "Color": "#FFFFFF"
        }
      },
      {
        "ID": "PipeOutlet",
        "ImgData": {
          "Type": "Circle",
          "Radius": 10,
          "Color": "#4224e4"
        }
      }
    ],
    "ReservoirList": [
      {
        "ID": "RV1",
        "Name": "저수조",
        "X": 50,
        "Y": 930,
        "ImgID": "Reservoir"
      }
    ],
    "SaltPondLineList": [
      {
        "ID": "SPL1",
        "Name": "1",
        "ImgID": "SaltPondLine_A",
        "Points": [
          450,
          160,
          450,
          1080
        ]
      },
      {
        "ID": "SPL2",
        "Name": "2",
        "ImgID": "SaltPondLine_A",
        "Points": [
          430,
          180,
          570,
          180
        ]
      },
      {
        "ID": "SPL3",
        "Name": "3",
        "ImgID": "SaltPondLine_A",
        "Points": [
          690,
          160,
          690,
          1080
        ]
      },
      {
        "ID": "SPL4",
        "Name": "4",
        "ImgID": "SaltPondLine_A",
        "Points": [
          610,
          180,
          710,
          180
        ]
      },
      {
        "ID": "SPL5",
        "Name": "5",
        "ImgID": "SaltPondLine_A",
        "Points": [
          750,
          180,
          850,
          180
        ]
      }
    ],
    "SaltPlateList": [
      {
        "ID": "SP1",
        "Name": "증발지 1A",
        "X": 230,
        "Y": 880,
        "ImgID": "SaltPlate_A"
      },
      {
        "ID": "SP2",
        "Name": "증발지 1B",
        "X": 230,
        "Y": 660,
        "ImgID": "SaltPlate_A"
      },
      {
        "ID": "SP3",
        "Name": "증발지 1C",
        "X": 230,
        "Y": 440,
        "ImgID": "SaltPlate_A"
      },
      {
        "ID": "SP4",
        "Name": "증발지 1D",
        "X": 230,
        "Y": 220,
        "ImgID": "SaltPlate_A"
      },
      {
        "ID": "SP5",
        "Name": "증발지 일반",
        "X": 230,
        "Y": 0,
        "ImgID": "SaltPlate_B"
      },
      {
        "ID": "SP6",
        "Name": "증발지 2",
        "X": 470,
        "Y": 220,
        "ImgID": "SaltPlate_B"
      },
      {
        "ID": "SP7",
        "Name": "증발지 3",
        "X": 470,
        "Y": 440,
        "ImgID": "SaltPlate_B"
      },
      {
        "ID": "SP8",
        "Name": "증발지 4",
        "X": 470,
        "Y": 660,
        "ImgID": "SaltPlate_B"
      },
      {
        "ID": "SP9",
        "Name": "결정지 1",
        "X": 470,
        "Y": 880,
        "ImgID": "SaltPlate_C"
      }
    ],
    "WaterTankList": [
      {
        "ID": "WT1",
        "Name": "해주1",
        "X": 470,
        "Y": 50,
        "ImgID": "WaterTank_A"
      },
      {
        "ID": "WT2",
        "Name": "해주2",
        "X": 610,
        "Y": 50,
        "ImgID": "WaterTank_A"
      },
      {
        "ID": "WT3",
        "Name": "해주3",
        "X": 750,
        "Y": 50,
        "ImgID": "WaterTank_A"
      }
    ],
    "WaterDoorList": [
      {
        "ID": "WD1",
        "Name": "수문1",
        "X": 390,
        "Y": 1040,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD2",
        "Name": "수문2",
        "X": 390,
        "Y": 820,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD3",
        "Name": "수문3",
        "X": 390,
        "Y": 600,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD4",
        "Name": "수문4",
        "X": 390,
        "Y": 380,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD5",
        "Name": "수문5",
        "X": 390,
        "Y": 160,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD6",
        "Name": "수문6",
        "X": 550,
        "Y": 412,
        "ImgID": "WaterDoor_B"
      },
      {
        "ID": "WD7",
        "Name": "수문7",
        "X": 550,
        "Y": 632,
        "ImgID": "WaterDoor_B"
      },
      {
        "ID": "WD8",
        "Name": "수문8",
        "X": 630,
        "Y": 820,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD9",
        "Name": "수문9",
        "X": 630,
        "Y": 1040,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD10",
        "Name": "수문10",
        "X": 530,
        "Y": 120,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD11",
        "Name": "수문11",
        "X": 670,
        "Y": 120,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD12",
        "Name": "수문12",
        "X": 810,
        "Y": 120,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD13",
        "Name": "수문13",
        "X": 570,
        "Y": 160,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD14",
        "Name": "수문14",
        "X": 710,
        "Y": 160,
        "ImgID": "WaterDoor_A"
      },
      {
        "ID": "WD15",
        "Name": "수문15",
        "X": 810,
        "Y": 200,
        "ImgID": "WaterDoor_A"
      }
    ],
    "PumpList": [
      {
        "ID": "P1",
        "Name": "펌프1",
        "X": 100,
        "Y": 1140,
        "ImgID": "Pump_A"
      },
      {
        "ID": "P2",
        "Name": "펌프2",
        "X": 130,
        "Y": 950,
        "ImgID": "Pump_A"
      },
      {
        "ID": "P3",
        "Name": "펌프3",
        "X": 550,
        "Y": 70,
        "ImgID": "Pump_A"
      },
      {
        "ID": "P4",
        "Name": "펌프4",
        "X": 630,
        "Y": 140,
        "ImgID": "Pump_A"
      },
      {
        "ID": "P5",
        "Name": "펌프5",
        "X": 770,
        "Y": 140,
        "ImgID": "Pump_A"
      }
    ],
    "ValveList": [
      {
        "ID": "V1",
        "Name": "밸브1",
        "X": 250,
        "Y": 900,
        "ImgID": "Valve_A"
      },
      {
        "ID": "V2",
        "Name": "밸브2",
        "X": 250,
        "Y": 840,
        "ImgID": "Valve_A"
      },
      {
        "ID": "V3",
        "Name": "밸브3",
        "X": 250,
        "Y": 460,
        "ImgID": "Valve_A"
      },
      {
        "ID": "V4",
        "Name": "밸브4",
        "X": 250,
        "Y": 400,
        "ImgID": "Valve_A"
      },
      {
        "ID": "V5",
        "Name": "밸브5",
        "X": 250,
        "Y": 180,
        "ImgID": "Valve_A"
      },
      {
        "ID": "V6",
        "Name": "밸브6",
        "X": 100,
        "Y": 1060,
        "ImgID": "Valve_B"
      },
      {
        "ID": "V7",
        "Name": "밸브7",
        "X": 630,
        "Y": 70,
        "ImgID": "Valve_B"
      },
      {
        "ID": "V8",
        "Name": "밸브8",
        "X": 628,
        "Y": 240,
        "ImgID": "Valve_B"
      },
      {
        "ID": "V9",
        "Name": "밸브9",
        "X": 650,
        "Y": 900,
        "ImgID": "Valve_B"
      }
    ],
    "PipeList": [
      {
        "ID": "PL1",
        "Name": "PL1",
        "ImgID": "PipeList_A",
        "Points": [
          100,
          1080,
          100,
          1120
        ]
      },
      {
        "ID": "PL2",
        "Name": "PL2",
        "ImgID": "PipeList_A",
        "Points": [
          150,
          950,
          190,
          950
        ]
      },
      {
        "ID": "PL3",
        "Name": "PL3",
        "ImgID": "PipeList_A",
        "Points": [
          190,
          870,
          190,
          950
        ]
      },
      {
        "ID": "PL4",
        "Name": "PL4",
        "ImgID": "PipeList_A",
        "Points": [
          190,
          870,
          250,
          870
        ]
      },
      {
        "ID": "PL5",
        "Name": "PL5",
        "ImgID": "PipeList_A",
        "Points": [
          250,
          850,
          250,
          870
        ]
      },
      {
        "ID": "PL6",
        "Name": "PL6",
        "ImgID": "PipeList_A",
        "Points": [
          250,
          870,
          250,
          890
        ]
      },
      {
        "ID": "PL7",
        "Name": "PL7",
        "ImgID": "PipeList_A",
        "Points": [
          190,
          430,
          190,
          870
        ]
      },
      {
        "ID": "PL8",
        "Name": "PL8",
        "ImgID": "PipeList_A",
        "Points": [
          190,
          430,
          250,
          430
        ]
      },
      {
        "ID": "PL9",
        "Name": "PL9",
        "ImgID": "PipeList_A",
        "Points": [
          250,
          410,
          250,
          430
        ]
      },
      {
        "ID": "PL10",
        "Name": "PL10",
        "ImgID": "PipeList_A",
        "Points": [
          250,
          430,
          250,
          450
        ]
      },
      {
        "ID": "PL11",
        "Name": "PL11",
        "ImgID": "PipeList_A",
        "Points": [
          190,
          180,
          190,
          430
        ]
      },
      {
        "ID": "PL12",
        "Name": "PL12",
        "ImgID": "PipeList_A",
        "Points": [
          190,
          180,
          230,
          180
        ]
      },
      {
        "ID": "PL13",
        "Name": "PL13",
        "ImgID": "PipeList_A",
        "Points": [
          570,
          70,
          610,
          70
        ]
      },
      {
        "ID": "PL14",
        "Name": "PL14",
        "ImgID": "PipeList_A",
        "Points": [
          630,
          160,
          630,
          220
        ]
      },
      {
        "ID": "PL15",
        "Name": "PL15",
        "ImgID": "PipeList_A",
        "Points": [
          770,
          160,
          770,
          900
        ]
      },
      {
        "ID": "PL16",
        "Name": "PL16",
        "ImgID": "PipeList_A",
        "Points": [
          670,
          900,
          770,
          900
        ]
      }
    ],
    "WaterOutList": [
      {
        "ID": "WO1",
        "Name": "바다",
        "X": 50,
        "Y": 1120,
        "ImgID": "WaterOut_A"
      },
      {
        "ID": "WO2",
        "Name": "바다",
        "X": 750,
        "Y": 200,
        "ImgID": "WaterOut_B"
      }
    ],
    "WaterWayList": [
      {}
    ],
    "SaltRateSensorList": [
      {
        "ID": "S1",
        "Name": "염도1",
        "X": 332,
        "Y": 960,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S2",
        "Name": "염도2",
        "X": 332,
        "Y": 740,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S3",
        "Name": "염도3",
        "X": 332,
        "Y": 520,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S4",
        "Name": "염도4",
        "X": 332,
        "Y": 300,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S5",
        "Name": "염도5",
        "X": 332,
        "Y": 80,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S6",
        "Name": "염도6",
        "X": 572,
        "Y": 300,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S7",
        "Name": "염도7",
        "X": 572,
        "Y": 520,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S8",
        "Name": "염도8",
        "X": 572,
        "Y": 740,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S9",
        "Name": "염도9",
        "X": 572,
        "Y": 960,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S10",
        "Name": "염도10",
        "X": 522,
        "Y": 94,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S11",
        "Name": "염도11",
        "X": 662,
        "Y": 94,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S12",
        "Name": "염도12",
        "X": 802,
        "Y": 94,
        "ImgID": "SRSensor"
      },
      {
        "ID": "S13",
        "Name": "염도13",
        "X": 102,
        "Y": 990,
        "ImgID": "SRSensor"
      }
    ],
    "WaterLevelSensorList": [
      {
        "ID": "WL1",
        "Name": "수위1",
        "X": 283,
        "Y": 960,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL2",
        "Name": "수위2",
        "X": 283,
        "Y": 740,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL3",
        "Name": "수위3",
        "X": 283,
        "Y": 520,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL4",
        "Name": "수위4",
        "X": 283,
        "Y": 300,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL5",
        "Name": "수위5",
        "X": 283,
        "Y": 80,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL6",
        "Name": "수위6",
        "X": 523,
        "Y": 300,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL7",
        "Name": "수위7",
        "X": 523,
        "Y": 520,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL8",
        "Name": "수위8",
        "X": 523,
        "Y": 740,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL9",
        "Name": "수위9",
        "X": 523,
        "Y": 960,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL10",
        "Name": "수위10",
        "X": 473,
        "Y": 94,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL11",
        "Name": "수위11",
        "X": 613,
        "Y": 94,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL12",
        "Name": "수위12",
        "X": 753,
        "Y": 94,
        "ImgID": "WLSensor"
      },
      {
        "ID": "WL13",
        "Name": "수위13",
        "X": 53,
        "Y": 990,
        "ImgID": "WLSensor"
      }
    ],
    "UnderWaterTemperatureList": [
      {
        "ID": "UT1",
        "Name": "수중온도1",
        "X": 268,
        "Y": 1000,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT2",
        "Name": "수중온도2",
        "X": 268,
        "Y": 780,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT3",
        "Name": "수중온도3",
        "X": 268,
        "Y": 560,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT4",
        "Name": "수중온도4",
        "X": 268,
        "Y": 340,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT5",
        "Name": "수중온도5",
        "X": 268,
        "Y": 120,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT6",
        "Name": "수중온도6",
        "X": 508,
        "Y": 340,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT7",
        "Name": "수중온도7",
        "X": 508,
        "Y": 560,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT8",
        "Name": "수중온도8",
        "X": 508,
        "Y": 780,
        "ImgID": "UWTemperature"
      },
      {
        "ID": "UT9",
        "Name": "수중온도9",
        "X": 508,
        "Y": 1000,
        "ImgID": "UWTemperature"
      }
    ],
    "ModuleTemperatureList": [
      {
        "ID": "MT1",
        "Name": "모듈온도1",
        "X": 332,
        "Y": 1000,
        "ImgID": "MTemperature"
      },
      {
        "ID": "MT2",
        "Name": "모듈온도2",
        "X": 332,
        "Y": 780,
        "ImgID": "MTemperature"
      },
      {
        "ID": "MT3",
        "Name": "모듈온도3",
        "X": 332,
        "Y": 560,
        "ImgID": "MTemperature"
      },
      {
        "ID": "MT4",
        "Name": "모듈온도4",
        "X": 332,
        "Y": 340,
        "ImgID": "MTemperature"
      }
    ],
    "PipeOutletList": [
      {
        "ID": "PO1",
        "Name": "배출구1",
        "X": 250,
        "Y": 930,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO2",
        "Name": "배출구2",
        "X": 250,
        "Y": 810,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO3",
        "Name": "배출구3",
        "X": 250,
        "Y": 490,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO4",
        "Name": "배출구4",
        "X": 250,
        "Y": 370,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO5",
        "Name": "배출구5",
        "X": 250,
        "Y": 150,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO6",
        "Name": "배출구6",
        "X": 100,
        "Y": 1030,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO7",
        "Name": "배출구7",
        "X": 660,
        "Y": 70,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO8",
        "Name": "배출구8",
        "X": 630,
        "Y": 270,
        "ImgID": "PipeOutlet"
      },
      {
        "ID": "PO9",
        "Name": "배출구9",
        "X": 650,
        "Y": 930,
        "ImgID": "PipeOutlet"
      }
    ]
  },
  "SETINFO": {
    "PumpData": [
      {
        "ID": "P1",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "15001"
      },
      {
        "ID": "P2",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "15002"
      },
      {
        "ID": "P3",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "15003"
      },
      {
        "ID": "P4",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "15004"
      },
      {
        "ID": "P5",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "15005"
      }
    ],
    "ValveData": [
      {
        "ID": "V1",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14001"
      },
      {
        "ID": "V2",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14002"
      },
      {
        "ID": "V3",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14003"
      },
      {
        "ID": "V4",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14004"
      },
      {
        "ID": "V5",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14005"
      },
      {
        "ID": "V6",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14006"
      },
      {
        "ID": "V7",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14007"
      },
      {
        "ID": "V8",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14008"
      },
      {
        "ID": "V9",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "14009"
      }
    ],
    "WaterDoorData": [
      {
        "ID": "WD1",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11001"
      },
      {
        "ID": "WD2",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11002"
      },
      {
        "ID": "WD3",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11003"
      },
      {
        "ID": "WD4",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11004"
      },
      {
        "ID": "WD5",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11005"
      },
      {
        "ID": "WD6",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11006"
      },
      {
        "ID": "WD7",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11007"
      },
      {
        "ID": "WD8",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11008"
      },
      {
        "ID": "WD9",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11009"
      },
      {
        "ID": "WD10",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11010"
      },
      {
        "ID": "WD11",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11011"
      },
      {
        "ID": "WD12",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11012"
      },
      {
        "ID": "WD13",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11013"
      },
      {
        "ID": "WD14",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11014"
      },
      {
        "ID": "WD15",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "11015"
      }
    ],
    "WaterLevelData": [
      {
        "ID": "WL1",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12001"
      },
      {
        "ID": "WL2",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12002"
      },
      {
        "ID": "WL3",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12003"
      },
      {
        "ID": "WL4",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12004"
      },
      {
        "ID": "WL5",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12005"
      },
      {
        "ID": "WL6",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12006"
      },
      {
        "ID": "WL7",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12007"
      },
      {
        "ID": "WL8",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12008"
      },
      {
        "ID": "WL9",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12009"
      },
      {
        "ID": "WL10",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12010"
      },
      {
        "ID": "WL11",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12011"
      },
      {
        "ID": "WL12",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12012"
      },
      {
        "ID": "WL13",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "12013"
      }
    ],
    "SalinityData": [
      {
        "ID": "S1",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13001"
      },
      {
        "ID": "S2",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13002"
      },
      {
        "ID": "S3",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13003"
      },
      {
        "ID": "S4",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13004"
      },
      {
        "ID": "S5",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13005"
      },
      {
        "ID": "S6",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13006"
      },
      {
        "ID": "S7",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13007"
      },
      {
        "ID": "S8",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13008"
      },
      {
        "ID": "S9",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13009"
      },
      {
        "ID": "S10",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13010"
      },
      {
        "ID": "S11",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13011"
      },
      {
        "ID": "S12",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13012"
      },
      {
        "ID": "S13",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "13013"
      }
    ],
    "UnderWaterTemperatureData": [
      {
        "ID": "UT1",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16001"
      },
      {
        "ID": "UT2",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16002"
      },
      {
        "ID": "UT3",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16003"
      },
      {
        "ID": "UT4",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16004"
      },
      {
        "ID": "UT5",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16005"
      },
      {
        "ID": "UT6",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16006"
      },
      {
        "ID": "UT7",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16007"
      },
      {
        "ID": "UT8",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16008"
      },
      {
        "ID": "UT9",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "16009"
      }
    ],
    "ModuleTemperatureData": [
      {
        "ID": "MT1",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "17001"
      },
      {
        "ID": "MT2",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "17002"
      },
      {
        "ID": "MT3",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "17003"
      },
      {
        "ID": "MT4",
        "DeviceType": "Socket",
        "BoardID": "",
        "IP": "localhost",
        "Port": "17004"
      }
    ]
  },
  "RELATION": {
    "SaltPlateData": [
      {
        "ID": "SP1",
        "PlateType": "Evaporating Pond",
        "Depth": 5,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [
          "MT1"
        ],
        "ListUnderWaterTemperature": [
          "UT1"
        ],
        "ListWaterDoor": [
          "WD1"
        ],
        "ListWaterLevel": [
          "WL1"
        ],
        "ListSalinity": [
          "S1"
        ],
        "ListValve": [
          "V1"
        ],
        "ListPump": []
      },
      {
        "ID": "SP2",
        "PlateType": "Evaporating Pond",
        "Depth": 5,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [
          "MT2"
        ],
        "ListUnderWaterTemperature": [
          "UT2"
        ],
        "ListWaterDoor": [
          "WD2"
        ],
        "ListWaterLevel": [
          "WL2"
        ],
        "ListSalinity": [
          "S2"
        ],
        "ListValve": [
          "V2"
        ],
        "ListPump": []
      },
      {
        "ID": "SP3",
        "PlateType": "Evaporating Pond",
        "Depth": 5,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [
          "MT3"
        ],
        "ListUnderWaterTemperature": [
          "UT3"
        ],
        "ListWaterDoor": [
          "WD3"
        ],
        "ListWaterLevel": [
          "WL3"
        ],
        "ListSalinity": [
          "S3"
        ],
        "ListValve": [
          "V3"
        ],
        "ListPump": []
      },
      {
        "ID": "SP4",
        "PlateType": "Evaporating Pond",
        "Depth": 5,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [
          "MT4"
        ],
        "ListUnderWaterTemperature": [
          "UT4"
        ],
        "ListWaterDoor": [
          "WD4"
        ],
        "ListWaterLevel": [
          "WL4"
        ],
        "ListSalinity": [
          "S4"
        ],
        "ListValve": [
          "V4"
        ],
        "ListPump": []
      },
      {
        "ID": "SP5",
        "PlateType": "Evaporating Pond",
        "Depth": 5,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [
          "UT5"
        ],
        "ListWaterDoor": [
          "WD5"
        ],
        "ListWaterLevel": [
          "WL5"
        ],
        "ListSalinity": [
          "S5"
        ],
        "ListValve": [
          "V5"
        ],
        "ListPump": []
      },
      {
        "ID": "SP6",
        "PlateType": "Evaporating Pond",
        "Depth": 4,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [
          "UT6"
        ],
        "ListWaterDoor": [
          "WD6"
        ],
        "ListWaterLevel": [
          "WL6"
        ],
        "ListSalinity": [
          "S6"
        ],
        "ListValve": [
          "V8"
        ],
        "ListPump": []
      },
      {
        "ID": "SP7",
        "PlateType": "Evaporating Pond",
        "Depth": 3,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [
          "UT7"
        ],
        "ListWaterDoor": [
          "WD6",
          "WD7"
        ],
        "ListWaterLevel": [
          "WL7"
        ],
        "ListSalinity": [
          "S7"
        ],
        "ListValve": [],
        "ListPump": []
      },
      {
        "ID": "SP8",
        "PlateType": "Evaporating Pond",
        "Depth": 2,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "18",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [
          "UT8"
        ],
        "ListWaterDoor": [
          "WD7",
          "WD8"
        ],
        "ListWaterLevel": [
          "WL8"
        ],
        "ListSalinity": [
          "S8"
        ],
        "ListValve": [],
        "ListPump": []
      },
      {
        "ID": "SP9",
        "PlateType": "Crystallizing Pond",
        "Depth": 1,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [
          "UT9"
        ],
        "ListWaterDoor": [
          "WD9"
        ],
        "ListWaterLevel": [
          "WL9"
        ],
        "ListSalinity": [
          "S9"
        ],
        "ListValve": [
          "V9"
        ],
        "ListPump": []
      }
    ],
    "WaterTankData": [
      {
        "ID": "WT1",
        "TankType": "Evaporating Pond",
        "Depth": -1,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "5",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [
          "WD10"
        ],
        "ListWaterLevel": [
          "WL10"
        ],
        "ListSalinity": [
          "S10"
        ],
        "ListValve": [],
        "ListPump": [
          "P3"
        ]
      },
      {
        "ID": "WT2",
        "TankType": "Evaporating Pond",
        "Depth": -1,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "15",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [
          "WD11"
        ],
        "ListWaterLevel": [
          "WL11"
        ],
        "ListSalinity": [
          "S11"
        ],
        "ListValve": [
          "V7"
        ],
        "ListPump": [
          "P4"
        ]
      },
      {
        "ID": "WT3",
        "TankType": "Evaporating Pond",
        "Depth": -1,
        "MinWaterLevel": 1,
        "MaxWaterLevel": 4,
        "SettingSalinity": "20",
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [
          "WD12"
        ],
        "ListWaterLevel": [
          "WL12"
        ],
        "ListSalinity": [
          "S12"
        ],
        "ListValve": [],
        "ListPump": [
          "P5"
        ]
      }
    ],
    "WaterOutData": [
      {
        "ID": "WO1",
        "Depth": -1,
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [],
        "ListWaterLevel": [],
        "ListSalinity": [],
        "ListValve": [],
        "ListPump": [
          "P1"
        ]
      },
      {
        "ID": "WO2",
        "Depth": -1,
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [
          "WD15"
        ],
        "ListWaterLevel": [],
        "ListSalinity": [],
        "ListValve": [],
        "ListPump": []
      }
    ],
    "ReservoirData": [
      {
        "ID": "RV1",
        "Depth": 100,
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [],
        "ListWaterLevel": [
          "WL13"
        ],
        "ListSalinity": [
          "S13"
        ],
        "ListValve": [
          "V6"
        ],
        "ListPump": [
          "P2"
        ]
      }
    ],
    "WaterWayData": [
      {
        "ID": "WW1",
        "Depth": 0.9,
        "ListSaltPondLine": [
          "SPL1",
          "SPL2"
        ],
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [
          "WD1",
          "WD2",
          "WD3",
          "WD4",
          "WD5",
          "WD10",
          "WD13"
        ],
        "ListWaterLevel": [],
        "ListSalinity": [],
        "ListValve": [],
        "ListPump": []
      },
      {
        "ID": "WW2",
        "Depth": 0.8,
        "ListSaltPondLine": [
          "SPL3",
          "SPL4"
        ],
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [
          "WD8",
          "WD9",
          "WD11",
          "WD13",
          "WD14"
        ],
        "ListWaterLevel": [],
        "ListSalinity": [],
        "ListValve": [],
        "ListPump": []
      },
      {
        "ID": "WW3",
        "Depth": 0.7,
        "ListSaltPondLine": [
          "SPL5"
        ],
        "ListModuleTemperature": [],
        "ListUnderWaterTemperature": [],
        "ListWaterDoor": [
          "WD12",
          "WD14",
          "WD15"
        ],
        "ListWaterLevel": [],
        "ListSalinity": [],
        "ListValve": [],
        "ListPump": []
      }
    ],
    "ValveRankData": [
      {
        "ID": "P1",
        "High": [],
        "Low": [
          "V6"
        ]
      },
      {
        "ID": "P2",
        "High": [],
        "Low": [
          "V1",
          "V2",
          "V3",
          "V4",
          "V5"
        ]
      },
      {
        "ID": "P3",
        "High": [],
        "Low": [
          "V7"
        ]
      },
      {
        "ID": "P4",
        "High": [],
        "Low": [
          "V8"
        ]
      },
      {
        "ID": "P5",
        "High": [],
        "Low": [
          "V9"
        ]
      },
      {
        "ID": "V1",
        "High": [
          "P2"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V2",
        "High": [
          "P2"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V3",
        "High": [
          "P2"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V4",
        "High": [
          "P2"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V5",
        "High": [
          "P2"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V6",
        "High": [
          "P1"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V7",
        "High": [
          "P3"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V8",
        "High": [
          "P4"
        ],
        "Low": [
        ]
      },
      {
        "ID": "V9",
        "High": [
          "P5"
        ],
        "Low": [
        ]
      }
    ],
    "FeedRankData": [
      {
        "ID": "SP1",
        "Rank": [
          "RV1"
        ]
      },
      {
        "ID": "SP2",
        "Rank": [
          "RV1"
        ]
      },
      {
        "ID": "SP3",
        "Rank": [
          "RV1"
        ]
      },
      {
        "ID": "SP4",
        "Rank": [
          "RV1"
        ]
      },
      {
        "ID": "SP5",
        "Rank": [
          "RV1"
        ]
      },
      {
        "ID": "SP6",
        "Rank": [
          "WT2"
        ]
      },
      {
        "ID": "SP7",
        "Rank": [
          "SP6"
        ]
      },
      {
        "ID": "SP8",
        "Rank": [
          "SP7"
        ]
      },
      {
        "ID": "SP9",
        "Rank": [
          "WT3"
        ]
      }
    ],
    "MaxSalinityFeedRankData": [
      {
        "ID": "SP1",
        "Rank": []
      },
      {
        "ID": "SP2",
        "Rank": []
      },
      {
        "ID": "SP3",
        "Rank": []
      },
      {
        "ID": "SP4",
        "Rank": []
      },
      {
        "ID": "SP5",
        "Rank": []
      },
      {
        "ID": "SP6",
        "Rank": []
      },
      {
        "ID": "SP7",
        "Rank": []
      },
      {
        "ID": "SP8",
        "Rank": [
          "WT3",
          "WT2"
        ]
      },
      {
        "ID": "SP9",
        "Rank": []
      }
    ]
  },
  "CONTROL": {
    "SimpleMode": [
      {
        "SrcID": "SP1",
        "DesList": [
          {
            "DesID": "WT1",
            "Type": "Common",
            "True": [
              "WD1",
              "WD10"
            ],
            "False": [
              "WD2",
              "WD3",
              "WD4",
              "WD5",
              "WD13"
            ]
          },
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "WD1",
              "WD13",
              "WD11"
            ],
            "False": [
              "WD2",
              "WD3",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD14"
            ]
          },
          {
            "DesID": "WT3",
            "Type": "Common",
            "True": [
              "WD1",
              "WD13",
              "WD14",
              "WD12"
            ],
            "False": [
              "WD2",
              "WD3",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD15"
            ]
          },
          {
            "DesID": "WO2",
            "Type": "Common",
            "True": [
              "WD1",
              "WD13",
              "WD14",
              "WD15"
            ],
            "False": [
              "WD2",
              "WD3",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD12"
            ]
          }
        ]
      },
      {
        "SrcID": "SP2",
        "DesList": [
          {
            "DesID": "WT1",
            "Type": "Common",
            "True": [
              "WD2",
              "WD10"
            ],
            "False": [
              "WD1",
              "WD3",
              "WD4",
              "WD5",
              "WD13"
            ]
          },
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "WD2",
              "WD13",
              "WD11"
            ],
            "False": [
              "WD1",
              "WD3",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD14"
            ]
          },
          {
            "DesID": "WT3",
            "Type": "Common",
            "True": [
              "WD2",
              "WD13",
              "WD14",
              "WD12"
            ],
            "False": [
              "WD1",
              "WD3",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD15"
            ]
          },
          {
            "DesID": "WO2",
            "Type": "Common",
            "True": [
              "WD2",
              "WD13",
              "WD14",
              "WD15"
            ],
            "False": [
              "WD1",
              "WD3",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD12"
            ]
          }
        ]
      },
      {
        "SrcID": "SP3",
        "DesList": [
          {
            "DesID": "WT1",
            "Type": "Common",
            "True": [
              "WD3",
              "WD10"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD4",
              "WD5",
              "WD13"
            ]
          },
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "WD3",
              "WD13",
              "WD11"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD14"
            ]
          },
          {
            "DesID": "WT3",
            "Type": "Common",
            "True": [
              "WD3",
              "WD13",
              "WD14",
              "WD12"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD15"
            ]
          },
          {
            "DesID": "WO2",
            "Type": "Common",
            "True": [
              "WD3",
              "WD13",
              "WD14",
              "WD15"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD4",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD12"
            ]
          }
        ]
      },
      {
        "SrcID": "SP4",
        "DesList": [
          {
            "DesID": "WT1",
            "Type": "Common",
            "True": [
              "WD4",
              "WD10"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD5",
              "WD13"
            ]
          },
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "WD4",
              "WD13",
              "WD11"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD14"
            ]
          },
          {
            "DesID": "WT3",
            "Type": "Common",
            "True": [
              "WD4",
              "WD13",
              "WD14",
              "WD12"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD15"
            ]
          },
          {
            "DesID": "WO2",
            "Type": "Common",
            "True": [
              "WD4",
              "WD13",
              "WD14",
              "WD15"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD5",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD12"
            ]
          }
        ]
      },
      {
        "SrcID": "SP5",
        "DesList": [
          {
            "DesID": "WT1",
            "Type": "Common",
            "True": [
              "WD5",
              "WD10"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD4",
              "WD13"
            ]
          },
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "WD5",
              "WD13",
              "WD11"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD4",
              "WD10",
              "WD8",
              "WD9",
              "WD14"
            ]
          },
          {
            "DesID": "WT3",
            "Type": "Common",
            "True": [
              "WD5",
              "WD13",
              "WD14",
              "WD12"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD4",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD15"
            ]
          },
          {
            "DesID": "WO2",
            "Type": "Common",
            "True": [
              "WD5",
              "WD13",
              "WD14",
              "WD15"
            ],
            "False": [
              "WD1",
              "WD2",
              "WD3",
              "WD4",
              "WD10",
              "WD8",
              "WD9",
              "WD11",
              "WD12"
            ]
          }
        ]
      },
      {
        "SrcID": "SP6",
        "DesList": [
          {
            "DesID": "SP7",
            "Type": "Common",
            "True": [
              "WD6"
            ],
            "False": [
              "WD7"
            ]
          }
        ]
      },
      {
        "SrcID": "SP7",
        "DesList": [
          {
            "DesID": "SP8",
            "Type": "Common",
            "True": [
              "WD7"
            ],
            "False": [
              "WD6",
              "WD8"
            ]
          }
        ]
      },
      {
        "SrcID": "SP8",
        "DesList": [
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "WD8",
              "WD11"
            ],
            "False": [
              "WD7",
              "WD9",
              "WD13",
              "WD14"
            ]
          },
          {
            "DesID": "WT3",
            "Type": "Common",
            "True": [
              "WD8",
              "WD14",
              "WD12"
            ],
            "False": [
              "WD7",
              "WD9",
              "WD13",
              "WD11",
              "WD15"
            ]
          },
          {
            "DesID": "WO2",
            "Type": "Common",
            "True": [
              "WD8",
              "WD14",
              "WD15"
            ],
            "False": [
              "WD7",
              "WD9",
              "WD13",
              "WD11",
              "WD12"
            ]
          }
        ]
      },
      {
        "SrcID": "SP9",
        "DesList": [
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "WD9",
              "WD11"
            ],
            "False": [
              "WD8",
              "WD13",
              "WD14"
            ]
          },
          {
            "DesID": "WT3",
            "Type": "Common",
            "True": [
              "WD9",
              "WD14",
              "WD12"
            ],
            "False": [
              "WD8",
              "WD13",
              "WD11",
              "WD15"
            ]
          },
          {
            "DesID": "WO2",
            "Type": "Common",
            "True": [
              "WD9",
              "WD14",
              "WD15"
            ],
            "False": [
              "WD8",
              "WD13",
              "WD11",
              "WD12"
            ]
          }
        ]
      },
      {
        "SrcID": "WO1",
        "DesList": [
          {
            "DesID": "RV1",
            "Type": "Common",
            "True": [
              "P1",
              "V6"
            ],
            "False": []
          }
        ]
      },
      {
        "SrcID": "RV1",
        "DesList": [
          {
            "DesID": "SP1",
            "Type": "Common",
            "True": [
              "P2",
              "V1"
            ],
            "False": [
              "WD1"
            ]
          },
          {
            "DesID": "SP2",
            "Type": "Common",
            "True": [
              "P2",
              "V2"
            ],
            "False": [
              "WD2"
            ]
          },
          {
            "DesID": "SP3",
            "Type": "Common",
            "True": [
              "P2",
              "V3"
            ],
            "False": [
              "WD3"
            ]
          },
          {
            "DesID": "SP4",
            "Type": "Common",
            "True": [
              "P2",
              "V4"
            ],
            "False": [
              "WD4"
            ]
          },
          {
            "DesID": "SP5",
            "Type": "Common",
            "True": [
              "P2",
              "V5"
            ],
            "False": [
              "WD5"
            ]
          }
        ]
      },
      {
        "SrcID": "WT1",
        "DesList": [
          {
            "DesID": "WT2",
            "Type": "Common",
            "True": [
              "P3",
              "V7"
            ],
            "False": [
              "WD10",
              "WD11"
            ]
          }
        ]
      },
      {
        "SrcID": "WT2",
        "DesList": [
          {
            "DesID": "SP6",
            "Type": "Common",
            "True": [
              "P4",
              "V8"
            ],
            "False": [
              "WD6",
              "WD11"
            ]
          }
        ]
      },
      {
        "SrcID": "WT3",
        "DesList": [
          {
            "DesID": "SP9",
            "Type": "Common",
            "True": [
              "P5",
              "V9"
            ],
            "False": [
              "WD9",
              "WD12"
            ]
          }
        ]
      }
    ],
    "AutomationMode": [
      {
        "Des": "SP9",
        "Src": [
          "WT3"
        ]
      }
    ],
    "SettingMode": [
      {
        "ID": "DeviceClose",
        "True": [],
        "False": [
          "WD1",
          "WD2",
          "WD3",
          "WD4",
          "WD5",
          "WD6",
          "WD7",
          "WD8",
          "WD9",
          "WD10",
          "WD11",
          "WD12",
          "WD13",
          "WD14",
          "WD15",
          "V1",
          "V2",
          "V3",
          "V4",
          "V5",
          "V6",
          "V7",
          "V8",
          "V9",
          "P1",
          "P2",
          "P3",
          "P4",
          "P5"
        ]
      },
      {
        "ID": "GoToSea",
        "True": [
          "WD1",
          "WD2",
          "WD3",
          "WD4",
          "WD5",
          "WD6",
          "WD7",
          "WD8",
          "WD9",
          "WD13",
          "WD14",
          "WD15"
        ],
        "False": [
          "WD10",
          "WD11",
          "WD12",
          "V1",
          "V2",
          "V3",
          "V4",
          "V5",
          "V6",
          "V7",
          "V8",
          "V9",
          "P1",
          "P2",
          "P3",
          "P4",
          "P5"
        ]
      }
    ],
    "RainMode": []
  }
}