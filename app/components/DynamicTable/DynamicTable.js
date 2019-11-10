import React from 'react';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import myTheme from '../../themes/myTheme/myTheme.json';
import './style.scss';

class DynamicTable extends React.Component {
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableToolbar: {
        root: {
          padding: '0',
          minHeight: '34px',
          '& button': {
            color: myTheme.palette.primary.main,
            padding: '4px',
            fontSize: '11.25pt',
            marginLeft: '10px',
            borderRadius: '4px'
          }
        },
        actions: {
          position: 'relative',
          zIndex: '2',
          flex: 'inherit'
        },
        left: {
          position: 'relative',
          zIndex: '2',
          // MUIDataTableSearch: {
          //   main: {
          //     backgroundColor: '#fff'
          //   }
          // }
        },

        // root: {
        //   padding: '0 !important',
        // },
        filterPaper: {
          padding: '0 !important',
          maxWidth: '400px !important'
        },
        icon: {
          MuiSvgIcon: {
            root: {
              color: 'red',
            }
          }
        },
        titleText: {
          fontSize: '9pt',
          color: myTheme.palette.primary.main,
          fontWeight: '400',
          textTransform: 'uppercase',
          fontFamily: 'acumin-pro, sans-serif',
          letterSpacing: '1px',
        },
      },
      MUIDataTableHeadCell: {
        root: {
          fontSize: '9pt',
          color: myTheme.tertiary,
          fontWeight: '600',
          fontFamily: 'acumin-pro, sans-serif',
          border: '0',
          // whiteSpace:'pre'
        },
        data: {
          fontWeight: '600',
          fontFamily: 'acumin-pro, sans-serif'
        },
        toolButton: {
          height: 'auto'
        }
      },
      MuiTableRow: {
        root: {
          cursor: 'pointer',
          MUIDataTableBodyCell: {
            responsiveStacked: {
              fontWeight: '600',
              backgroundColor: 'green',
            }
          },
        }
      },
      MuiTableCell: {
        root: {
          padding: '14px 20px 14px 16px'
        },
        body: {
          fontSize: '9.75pt',
          color: myTheme.palette.primary.main,
          fontWeight: '400',
          fontFamily: 'acumin-pro, sans-serif'
        }
      },
      MuiTableBody: {
        root: {
          '& tr:nth-child(even)': {
            backgroundColor: 'rgba(182, 237, 182, 0.1)',
            border: '0'
          },
          '& tr:nth-child(odd)': {
            backgroundColor: 'rgba(246, 246, 246, 1)',
            border: '0'
          },
          '& td': {
            border: '0'
          }
        }
      },
      MUIDataTablePagination: {
        root: {
          padding: '0 !important',
          color: `${myTheme.palette.primary.main} !important`,
          fontSize: '10.5pt',
          fontWeight: '400',
          fontFamily: 'acumin-pro, sans-serif',
          border: '0',
        }
      },
      // MUIDataTableToolbar: {
      //   root: {
      //     padding: '0 !important',
      //   },
      //   filterPaper: {
      //     padding: '0 !important',
      //     maxWidth: '400px !important'
      //   }
      // },
      MuiTablePagination: {
        root: {
          padding: '0 !important',
          color: myTheme.palette.primary.main,
          fontSize: '10.5pt',
          fontWeight: '400',
          fontFamily: 'acumin-pro, sans-serif',
          border: '0',
        },
        toolbar: {
          paddingLeft: 0,
          fontSize: '10.5pt',
          '& button': {
            color: myTheme.palette.primary.main,
            padding: '4px',
            fontSize: '11.25pt',
            marginLeft: '10px',
            borderRadius: '4px'
          },
          '& button:disabled': {
            color: myTheme.palette.primary.main,
          }
        },
        spacer: {
          flexGrow: '0',
          flexShrink: '0',
          flexBasis: '0'
        },
        actions: {
          flexGrow: '1',
          flexShrink: '1',
          flexBasis: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }
      }
    },
    MuiTypography: {
      root: {
        fontFamily: 'acumin-pro, sans-serif'
      }
    },
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        light: myTheme.palette.primary.main,
        main: myTheme.palette.primary.main,
        dark: myTheme.palette.primary.main,
        contrastText: '#fff'
      },
      secondary: {
        light: myTheme.palette.secondary.main,
        main: myTheme.palette.secondary.main,
        dark: myTheme.palette.secondary.main,
        contrastText: '#fff'
      }
    }
  });
  render() {
    const options = {
      ...this.props.options,
      filterType: 'multiselect',
      selectableRowsOnClick: false,
      selectableRows: 'none',
      download: false,
      print: false,
      textLabels: {
        body: {
          noMatch: this.props.loading ?
            <CircularProgress className="circular_progress" color="primary" /> :
            this.props.noDataText,
        },
      },
      elevation: 0

    };
    return (
      <Grid className="dynamicTable">
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            columns={this.props.columns}
            options={options}
            data={this.props.data}
            title={this.props.title}
          />
        </MuiThemeProvider>
      </Grid>
    );
  }
}

export default DynamicTable;
