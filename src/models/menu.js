var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Menu = mongoose.model(
  "menus",
  new Schema({}, { strict: false })
);


export function addSystemMenu(body) {
  return new Promise((resolve, reject) => {
    var menu = new Menu(body);
    menu.save(function (err, data) {
      if (!err) {
        resolve({
          success: true,
          message: "Menu Added Successfully",
          data
        });
      } else {
        resolve({
          success: false,
          message: "Unable to add Menu",
          data: err
        });
      }
    });
  })
}

export function listMenus() {
  return new Promise((resolve, reject) => {

    Menu.find({}, (err, docs) => {
      if (!err) {
        resolve({
          success: true,
          message: "System Menus fetched successfully",
          data: docs
        });
      } else {
        resolve({
          success: false,
          message: "Can't find System Menus",
          data: null
        });
      }
    });

  });
}

export function getMenu(role) {
  return new Promise((resolve, reject) => {

    Menu.findOne({ role: role }, (err, docs) => {
      if (!err) {

        resolve({
          success: true,
          message: "Menu Fetched",
          data: docs
        });
      } else {
        resolve({
          success: false,
          message: "Can't find Menu",
          data: null
        });
      }
    });

  });
}

export async function addAllMenu() {
  let data = [{
    role: "admin",
    menu: [
      {
        label: "Navigation",
        main: [
          {
            state: "dashboard",
            short_label: "D",
            name: "Dashboard",
            type: "link",
            icon: "ti-home"
          },
        ]
      },
      {
        label: "Location",
        main: [
          {
            state: "newBuilding",
            short_label: "B",
            name: "Buildings",
            type: "link",
            icon: "ti-home"
          }
        ]
      },
      {
        label: "Users",
        main: [
          {
            state: "user",
            short_label: "U",
            name: "Users",
            type: "link",
            icon: "ti-user"
          }
        ]
      },
      {
        label: 'General',
        main: [
          {
            state: "group",
            short_label: "D",
            name: "Group",
            type: "link",
            icon: "fa fa-users"
          },
          {
            state: "smartcard",
            short_label: "D",
            name: "Smart Card",
            type: "link",
            icon: "ti-credit-card"
          },
          {
            state: "employee",
            short_label: "D",
            name: "Employee",
            type: "link",
            icon: "fa fa-user"
          },
          {
            state: "gateway",
            short_label: "D",
            name: "Gateway",
            type: "link",
            icon: "ti-signal"
          },
        ]
      },
      {
        label: "Employee Tracking",
        main: [
          {
            state: "tracking",
            short_label: "E",
            name: "Employee Tracking",
            type: "sub",
            icon: "fa fa-map-marker",
            children: [
              {
                state: "table",
                name: "Tracking Table"
              },
              {
                state: "live-location",
                name: "Live Tracking"
              },
              {
                state: "floor-live-location",
                name: "Floor Live Location"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    role: "project_manager",
    menu: [
      {
        label: "Navigation",
        main: [
          {
            state: "dashboard",
            short_label: "D",
            name: "Dashboard",
            type: "link",
            icon: "ti-home"
          },
        ]
      },
      {
        label: "Location",
        main: [
          {
            state: "newBuilding",
            short_label: "B",
            name: "Buildings",
            type: "link",
            icon: "ti-home"
          }
        ]
      },
      {
        label: 'General',
        main: [
          {
            state: "group",
            short_label: "D",
            name: "Group",
            type: "link",
            icon: "fa fa-users"
          },
          {
            state: "smartcard",
            short_label: "D",
            name: "Smart Card",
            type: "link",
            icon: "ti-credit-card"
          },
          {
            state: "employee",
            short_label: "D",
            name: "Employee",
            type: "link",
            icon: "fa fa-user"
          },
          {
            state: "gateway",
            short_label: "D",
            name: "Gateway",
            type: "link",
            icon: "ti-signal"
          },
        ]
      },
      {
        label: "Employee Tracking",
        main: [
          {
            state: "tracking",
            short_label: "E",
            name: "Employee Tracking",
            type: "sub",
            icon: "fa fa-map-marker",
            children: [
              {
                state: "table",
                name: "Tracking Table"
              },
              {
                state: "live-location",
                name: "Live Tracking"
              },
              {
                state: "floor-live-location",
                name: "Floor Live Location"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    role: "qc_manager",
    menu: [
      {
        label: "Navigation",
        main: [
          {
            state: "dashboard",
            short_label: "D",
            name: "Dashboard",
            type: "link",
            icon: "ti-home"
          },
        ]
      },
      {
        label: "Location",
        main: [
          {
            state: "newBuilding",
            short_label: "B",
            name: "Buildings",
            type: "link",
            icon: "ti-home"
          }
        ]
      },
      {
        label: 'General',
        main: [
          {
            state: "group",
            short_label: "D",
            name: "Group",
            type: "link",
            icon: "fa fa-users"
          },
          {
            state: "smartcard",
            short_label: "D",
            name: "Smart Card",
            type: "link",
            icon: "ti-credit-card"
          },
          {
            state: "employee",
            short_label: "D",
            name: "Employee",
            type: "link",
            icon: "fa fa-user"
          },
          {
            state: "gateway",
            short_label: "D",
            name: "Gateway",
            type: "link",
            icon: "ti-signal"
          },
        ]
      },
      {
        label: "Employee Tracking",
        main: [
          {
            state: "tracking",
            short_label: "E",
            name: "Employee Tracking",
            type: "sub",
            icon: "fa fa-map-marker",
            children: [
              {
                state: "table",
                name: "Tracking Table"
              },
              {
                state: "live-location",
                name: "Live Tracking"
              },
              {
                state: "floor-live-location",
                name: "Floor Live Location"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    role: "qc_helper",
    menu: [
      {
        label: "Navigation",
        main: [
          {
            state: "dashboard",
            short_label: "D",
            name: "Dashboard",
            type: "link",
            icon: "ti-home"
          },
        ]
      },
      {
        label: "Location",
        main: [
          {
            state: "newBuilding",
            short_label: "B",
            name: "Buildings",
            type: "link",
            icon: "ti-home"
          }
        ]
      },
      {
        label: 'General',
        main: [
          {
            state: "group",
            short_label: "D",
            name: "Group",
            type: "link",
            icon: "fa fa-users"
          },
          {
            state: "smartcard",
            short_label: "D",
            name: "Smart Card",
            type: "link",
            icon: "ti-credit-card"
          },
          {
            state: "employee",
            short_label: "D",
            name: "Employee",
            type: "link",
            icon: "fa fa-user"
          },
          {
            state: "gateway",
            short_label: "D",
            name: "Gateway",
            type: "link",
            icon: "ti-signal"
          },
        ]
      },
      {
        label: "Employee Tracking",
        main: [
          {
            state: "tracking",
            short_label: "E",
            name: "Employee Tracking",
            type: "sub",
            icon: "fa fa-map-marker",
            children: [
              {
                state: "table",
                name: "Tracking Table"
              },
              {
                state: "live-location",
                name: "Live Tracking"
              },
              {
                state: "floor-live-location",
                name: "Floor Live Location"
              }
            ]
          }
        ]
      }

    ]
  },
  {
    role: "main_foreman",
    menu: [
      {
        label: "Navigation",
        main: [
          {
            state: "dashboard",
            short_label: "D",
            name: "Dashboard",
            type: "link",
            icon: "ti-home"
          },
        ]
      },
      {
        label: "Location",
        main: [
          {
            state: "newBuilding",
            short_label: "B",
            name: "Buildings",
            type: "link",
            icon: "ti-home"
          }
        ]
      },
      {
        label: 'General',
        main: [
          {
            state: "group",
            short_label: "D",
            name: "Group",
            type: "link",
            icon: "fa fa-users"
          },
          {
            state: "smartcard",
            short_label: "D",
            name: "Smart Card",
            type: "link",
            icon: "ti-credit-card"
          },
          {
            state: "employee",
            short_label: "D",
            name: "Employee",
            type: "link",
            icon: "fa fa-user"
          },
          {
            state: "gateway",
            short_label: "D",
            name: "Gateway",
            type: "link",
            icon: "ti-signal"
          },
        ]
      },
      {
        label: "Employee Tracking",
        main: [
          {
            state: "tracking",
            short_label: "E",
            name: "Employee Tracking",
            type: "sub",
            icon: "fa fa-map-marker",
            children: [
              {
                state: "table",
                name: "Tracking Table"
              },
              {
                state: "live-location",
                name: "Live Tracking"
              },
              {
                state: "floor-live-location",
                name: "Floor Live Location"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    role: "qc_inspector",
    menu: [
      {
        label: "Navigation",
        main: [
          {
            state: "dashboard",
            short_label: "D",
            name: "Dashboard",
            type: "link",
            icon: "ti-home"
          },
        ]
      },
      {
        label: "Location",
        main: [
          {
            state: "newBuilding",
            short_label: "B",
            name: "Buildings",
            type: "link",
            icon: "ti-home"
          }
        ]
      },
      {
        label: 'General',
        main: [
          {
            state: "group",
            short_label: "D",
            name: "Group",
            type: "link",
            icon: "fa fa-users"
          },
          {
            state: "smartcard",
            short_label: "D",
            name: "Smart Card",
            type: "link",
            icon: "ti-credit-card"
          },
          {
            state: "employee",
            short_label: "D",
            name: "Employee",
            type: "link",
            icon: "fa fa-user"
          },
          {
            state: "gateway",
            short_label: "D",
            name: "Gateway",
            type: "link",
            icon: "ti-signal"
          },
        ]
      },
      {
        label: "Employee Tracking",
        main: [
          {
            state: "tracking",
            short_label: "E",
            name: "Employee Tracking",
            type: "sub",
            icon: "fa fa-map-marker",
            children: [
              {
                state: "table",
                name: "Tracking Table"
              },
              {
                state: "live-location",
                name: "Live Tracking"
              },
              {
                state: "floor-live-location",
                name: "Floor Live Location"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    role: "supervisor",
    menu: [
      {
        label: "Navigation",
        main: [
          {
            state: "dashboard",
            short_label: "D",
            name: "Dashboard",
            type: "link",
            icon: "ti-home"
          },
        ]
      },
      {
        label: 'Employee Tracking',
        main: [
          {
            state: 'tracking',
            short_label: 'E',
            name: 'Employee Tracking',
            type: 'sub',
            icon: 'fa fa-map-marker',
            children: [
              {
                state: 'table',
                name: 'Tracking Table',
              },
              {
                state: 'live-location',
                name: 'Live Tracking'
              },
              {
                state: "floor-live-location",
                name: "Floor Live Location"
              }
            ]
          }
        ],
      }
    ]
  },
  ]
  data.forEach(item => {
    addSystemMenu(item).then(resp => {
      console.log(resp.data)
    })
  })
}

