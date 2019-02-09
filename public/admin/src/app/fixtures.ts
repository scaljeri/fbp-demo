export const basic =
  {
    "id": 1546340247802,
    "children": [
      {
        "type": "request",
        "title": "Request",
        "id": 1548710699103,
        "config": {
          "endpoint": "/api/todos",
          "expanded": false
        },
        "sockets": [
          {
            "id": 1548710699104,
            "type": "out",
            "format": "request"
          }
        ],
        "position": {
          "x": 15.35481770833334,
          "y": 42.87138584247259
        }
      },
      {
        "type": "response",
        "title": "Response",
        "id": 1549480488384,
        "config": {},
        "sockets": [
          {
            "id": 1549480488385,
            "type": "in"
          }
        ],
        "position": {
          "x": 61.70654296875001,
          "y": 38.654349451645075
        }
      },
      {
        "type": "flow",
        "title": "Composite Unit",
        "id": 1549486978673,
        "config": {
          "expanded": false
        },
        "sockets": [
          {
            "type": "out",
            "name": "out",
            "description": null,
            "color": null,
            "id": 1549487365674
          },
          {
            "type": "in",
            "name": "in",
            "description": null,
            "color": null,
            "id": 1549487355547
          }
        ],
        "children": [],
        "connections": [],
        "position": {
          "x": 46.065470377604164,
          "y": 39.422357926221345
        }
      },
      {
        "type": "flow",
        "title": "Authentication",
        "id": 1549486978662,
        "config": {
          "expanded": false
        },
        "sockets": [
          {
            "type": "out",
            "name": "true",
            "description": null,
            "color": "#0eda22",
            "id": 1549487204733
          },
          {
            "type": "out",
            "name": "false",
            "description": null,
            "color": "#f10b50",
            "id": 1549487195139,
            "format": null
          },
          {
            "type": "in",
            "name": "in",
            "description": null,
            "color": "#7cb2e7",
            "id": 1549487178168,
            "format": "request"
          }
        ],
        "children": [],
        "connections": [],
        "position": {
          "x": 32.10367838541667,
          "y": 41.54489656031906
        }
      }
    ],
    "connections": [
      {
        "from": 1549486978673,
        "out": 1549487365674,
        "to": 1549480488384,
        "in": 1549480488385,
        "id": 1549486978675
      },
      {
        "from": 1549486978662,
        "out": 1549487204733,
        "to": 1549486978673,
        "in": 1549487355547,
        "id": 1549486978674
      },
      {
        "from": 1548710699103,
        "out": 1548710699104,
        "to": 1549486978662,
        "in": 1549487178168,
        "id": 1549486978672
      }
    ]
  }
  /*
  {
    "id": 1546340247802,
    "children": [
      {
        "type": "custom",
        "title": "Filter click",
        "id": 1546892321364,
        "config": {
          "func": "// const out = new Subject();\n// function(val) {\nif (val && val.x && val.y) {\n    out.next(val)\n}",
          "expanded": false
        },
        "sockets": [
          {
            "id": 1546892321365,
            "type": "in"
          },
          {
            "id": 1546892321366,
            "type": "out"
          }
        ],
        "position": {
          "x": 31.165161132812486,
          "y": 55.20859297108673
        }
      },
      {
        "type": "custom",
        "title": "Mandelbrot point",
        "id": 1546976282116,
        "config": {
          "func": "// const out = new Subject();\n// function(val) {\n\nfunction convert(x, y) {\n    const ox = (x - -4) / (4 - -4) * val.width;\n    const oy = (y - -4) / (4 - -4) * val.height;\n    \n    return [Math.round(ox), Math.round(oy)];\n}\n\nif (val) {\n  const cR = val.x;\n  const cI = val.y;\n  const instr = [{\n    type: 'curve',\n    data: convert(val.x, val.y)\n    }, {\n       type: 'text',\n       data: [{\n       x: 5,\n       y: 50,\n       value: 'points: '}]\n    }\n  ];\n  \n  let i, x, y, nR, nI, zR = 0, zI = 0;\n  for(i = 0; i< val.maxIterations; i++) {\n      nR = zR * zR - zI * zI + cR;\n      nI = 2 * zI * zR + cI;\n\n      zR = nR;\n      zI = nI;\n      [x, y] = convert(zR, zI);\n      if (Math.abs(zR) <= 4 || Math.abs(zI) <= 4) {\n        instr[0].data.push( x, y );\n      } else {\n        break;\n      }\n  }\n  \n  \n  instr[0].data.push( x, y );\n  instr[1].data[0].value += (i + 1);\n  \n \n  out.next(instr);\n}",
          "expanded": false
        },
        "sockets": [
          {
            "id": 1546976282117,
            "type": "in"
          },
          {
            "id": 1546976282118,
            "type": "out"
          }
        ],
        "position": {
          "x": 39.22932942708332,
          "y": 65.5733804083295
        }
      },
      {
        "type": "zoomcanvas",
        "title": "Zoomable canvas",
        "id": 1546340247806,
        "config": {
          "expanded": true
        },
        "sockets": [
          {
            "id": 1546340247807,
            "type": "in",
            "format": "imageData"
          },
          {
            "id": 1546340247808,
            "type": "out",
            "format": "dimension"
          }
        ],
        "position": {
          "x": 7.003987630208346,
          "y": 35.93072286247781
        }
      },
      {
        "type": "fractals",
        "title": "Fractals",
        "id": 1546340247803,
        "config": {
          "selected": "mandelbrot"
        },
        "sockets": [
          {
            "id": 1546340247804,
            "type": "in",
            "format": "dimension"
          },
          {
            "id": 1546340247805,
            "type": "out",
            "format": "imageData"
          }
        ],
        "position": {
          "x": 6.805419921875002,
          "y": 5.184057203389836
        }
      },
      {
        "type": "fractals",
        "title": "Fractals",
        "id": 1546891939413,
        "config": {
          "selected": "julia"
        },
        "sockets": [
          {
            "id": 1546891939414,
            "type": "in",
            "format": "dimension"
          },
          {
            "id": 1546891939415,
            "type": "out",
            "format": "imageData"
          }
        ],
        "position": {
          "x": 26.00809733072917,
          "y": 5.168089481555324
        }
      },
      {
        "type": "zoomcanvas",
        "title": "Zoomable canvas",
        "id": 1546891939417,
        "config": {
          "expanded": false
        },
        "sockets": [
          {
            "id": 1546891939418,
            "type": "in",
            "format": "imageData"
          },
          {
            "id": 1546891939419,
            "type": "out",
            "format": "dimension"
          }
        ],
        "position": {
          "x": 40.900472005208336,
          "y": 4.948435942173486
        }
      },
      {
        "type": "canvas",
        "title": "Canvas",
        "id": 1546976282122,
        "config": {
          "expanded": true
        },
        "sockets": [
          {
            "id": 1546976282123,
            "type": "in"
          },
          {
            "id": 1546976282124,
            "type": "out",
            "format": "point"
          }
        ],
        "position": {
          "x": 54.081217447916664,
          "y": 42.758443419740765
        }
      }
    ],
    "connections": [
      {
        "from": 1546976282116,
        "out": 1546976282118,
        "to": 1546976282122,
        "in": 1546976282123,
        "id": 1546976282125
      },
      {
        "from": 1546892321364,
        "out": 1546892321366,
        "to": 1546976282116,
        "in": 1546976282117,
        "id": 1546976282121
      },
      {
        "from": 1546340247806,
        "out": 1546340247808,
        "to": 1546892321364,
        "in": 1546892321365,
        "id": 1546971921082
      },
      {
        "from": 1546892321364,
        "out": 1546892321366,
        "to": 1546891939413,
        "in": 1546891939414,
        "id": 1546895326226
      },
      {
        "from": 1546891939417,
        "out": 1546891939419,
        "to": 1546891939413,
        "in": 1546891939414,
        "id": 1546891939421
      },
      {
        "from": 1546891939413,
        "out": 1546891939415,
        "to": 1546891939417,
        "in": 1546891939418,
        "id": 1546891939420
      },
      {
        "from": 1546340247806,
        "out": 1546340247808,
        "to": 1546340247803,
        "in": 1546340247804,
        "id": 1546374626401
      },
      {
        "from": 1546340247803,
        "out": 1546340247805,
        "to": 1546340247806,
        "in": 1546340247807,
        "id": 1546340574657
      }
    ]
    */
