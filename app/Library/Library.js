/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// components
import DotsDropdown from 'components/DotsDropdown';
import CustomBanner from 'components/CustomBanner';
import EVbutton from 'components/EVbutton';
import CatalogueSearch from 'CatalogueSearch';
import QuickLink from '../components/FormInputs/QuickLink';
import CardComponent from '../components/FormInputs/card';
import ProfileIcon from '../images/products_icon2.svg';
import UpGradeDownGrade from '../components/UpGradeDownGrade';
import TransferList from '../components/TransferList';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  customContainer: {
    padding: '20px 25px'
  },
  blockContainer: {
    padding: '20px'
  },
  preview: {
    padding: '10px',
    backgroundColor: '#f5f5f5'
  },
  source: {
    padding: '15px',
    paddingLeft: '30px',
    backgroundColor: '#fef8ec'
  }

});

function Library(props) {
  const { classes } = props;
  const [createBtn, setCreateBtn] = useState(true);
  const imports = '// Dependencies import';
  const propUsage = '** props usage** ';
  const codeTitle = '** code **';

  // dotsdropdown data
  const menuData = [
    {
      lable: 'Subscription',
      path: '/configuration/manageAccount',
      data: []
    },
    {
      lable: 'LVOD',
      path: '/configuration/manageAccount',
      data: []
    },
    {
      lable: 'Advance Product',
      path: '/configuration/manageAccount',
      data: []
    },
    {
      lable: 'Sample Data',
      path: '/configuration/manageAccount',
      data: []
    }];

  // catalogue search
  const selectInputs = {
    SelectFiledName: 'BUgroup',
    SelectFiledID: 'BUgroup',
    SelectFiledLabel: 'Choose Group',
    data: [
      {
        value: 'Products',
        label: 'Products'
      },
      {
        value: 'Promotions',
        label: 'Promotions'
      }
    ]
  };
  return (
    <div className={classes.root}>
      <Grid container >
        <Grid item xs={12}>
          <Paper className={classes.paper}><b>Library</b></Paper>
        </Grid>
        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>Dots Dropdown</strong></p>
            <div className={classes.preview}>
              <DotsDropdown customData={menuData} />
              <DotsDropdown varient="vertical" customData={menuData} />
            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br /> <br />
              import DotsDropdown from 'components/DotsDropdown';
                <br /><br />

                {propUsage}   <br />
                /* varient  => horizontal, vertical  <br />
                 customData = > pass your dropdown menu list data  <br />
                 smaple  menuData  <br />
                 const menuData = [  <br />
                 &#123;  <br />
                 lable: 'Subscription',  <br />
                 path: '/configuration/manageAccount',  <br />
                 data: []  <br />
                 &#125;,  <br />
                 ... ] */ <br />
                <br /> <br />

                {codeTitle}
                <br /><br />
                &lt;DotsDropdown varient="vertical" customData=&#123;menuData&#125; /&gt;
                <br />
              </code>
            </div>
          </div>
        </Grid>

        {/* Banner */}
        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>Banner</strong></p>
            <div className={classes.preview}>
              <CustomBanner title="Products" createBtnText="Product" createBtn={createBtn} />
              <CustomBanner title="Promotions" createBtnText="promotion" createBtn={createBtn} dotsDropdown={menuData} />

            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br /> <br />
                import CustomBanner from 'components/CustomBanner';
                <br /><br />

                {propUsage}   <br />
                /* title : string => title="Products"  <br />
                    pageTitlet: string = > pageTitle="Promotions" <br />
                    createBtn: boolean  <br />
                    createBtnText:string => createBtnText="Product"  [  <br />
                    dotsDropdown = [{},{},...] => dotsDropdown= menuData;
                    smaple  menuData  <br />
                    const menuData = [  <br />
                    &#123;  <br />
                    lable: 'Subscription',  <br />
                    path: '/configuration/manageAccount',  <br />
                    data: []  <br />
                    &#125;,  <br />
                    ... ] */ <br />
                <br /> <br />

                {codeTitle}
                <br /><br />
                &lt;CustomBanner pageTitle="Promotions" createBtnText="promotion" createBtn=&#123;createBtn&#125; dotsDropdown=&#123;menuData&#125; /&gt;

                <br />
              </code>
            </div>
          </div>
        </Grid>

        {/* EVvutton */}
        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>EV button</strong></p>
            <div className={classes.preview}>
              <EVbutton path="library" />
            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br /> <br />
                import EVbutton from '../components/EVbutton';
                <br /><br />

                {propUsage}   <br />
                /* to : route path => to=&#123; library&#125; <br />
                * data =&#123; productName:'abc', BU:"svod" &#125;
                */
                <br /> <br />

                {codeTitle}
                <br /><br />
                &lt;EVbutton path="library" data= &#123;data &#125; /&gt;
                <br />
              </code>
            </div>
          </div>
        </Grid>

        {/* Catalogue search */}
        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>Catalogue</strong></p>
            <div className={classes.preview}>
              <CatalogueSearch title="search everything" selectInputs={selectInputs} />
            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br /> <br />

                <br /><br />

                {propUsage}   <br />
                /* to : route path => to="library"
                <br /> <br />

                {codeTitle}
                <br /><br />

                <br />
              </code>
            </div>
          </div>
        </Grid>
        {/* QuickLink Component */}

        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>QuickLink</strong></p>
            <div className={classes.preview}>
              <QuickLink content="Would you like to create a SVOD product" path="/login" data="routing along with data" />
            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br />
                import QuickLink from '../components/FormInputs/QuickLink';
                <h4>Props Usage</h4>
                <Grid item xs={6}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Path</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>content</TableCell>
                        <TableCell >Passes the content as a Link Text</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>path</TableCell>
                        <TableCell >Routes to specified path</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>data</TableCell>
                        <TableCell >Passes the data alog with route</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <br />
                {codeTitle}
                <br /><br />
                &lt;QuickLink content="Would you like to create a SVOD product" path="/login" data="routing along with data" /&gt;
                <br />
              </code>
            </div>
          </div>
        </Grid>

        {/* Card Component */}
        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>Card</strong></p>
            <div className={classes.preview}>
              <CardComponent icon={ProfileIcon} title="Advanced Configuration" path="/catalogue/products" />
            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br />
                   import CardComponent from '../components/FormInputs/card';
                <h4>Props Usage</h4>
                <Grid item xs={6}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Path</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>title</TableCell>
                        <TableCell >Title to the card</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>path</TableCell>
                        <TableCell >Routes to specified path</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>icon</TableCell>
                        <TableCell >Passes icon image to card</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <br />
                {codeTitle}
                <br /><br />
                &lt;CardComponent icon=&#123;ProfileIcon&#125; title="Advanced Configuration" path="/catalogue/products" /&gt;
                <br />
              </code>
            </div>
          </div>
        </Grid>

        {/* Transfer Component */}
        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>Card</strong></p>
            <div >
              <UpGradeDownGrade />
            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br />
                   import CardComponent from '../components/FormInputs/card';
                <h4>Props Usage</h4>
                <Grid item xs={6}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Path</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>title</TableCell>
                        <TableCell >Title to the card</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>path</TableCell>
                        <TableCell >Routes to specified path</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>icon</TableCell>
                        <TableCell >Passes icon image to card</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <br />
                {codeTitle}
                <br /><br />
                &lt;CardComponent icon=&#123;ProfileIcon&#125; title="Advanced Configuration" path="/catalogue/products" /&gt;
                <br />
              </code>
            </div>
          </div>
        </Grid>

        {/* TransferList Component */}
        <Grid item xs={12} className={classes.customContainer}>
          <div className={classes.blockContainer}>
            <p><strong>Card</strong></p>
            <div >
              <TransferList />
            </div>
            <div className={classes.source}>
              <code>
                {imports}
                <br />
                   import CardComponent from '../components/FormInputs/card';
                <h4>Props Usage</h4>
                <Grid item xs={6}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell >Path</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>title</TableCell>
                        <TableCell >Title to the card</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>path</TableCell>
                        <TableCell >Routes to specified path</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>icon</TableCell>
                        <TableCell >Passes icon image to card</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <br />
                {codeTitle}
                <br /><br />
                &lt;CardComponent icon=&#123;ProfileIcon&#125; title="Advanced Configuration" path="/catalogue/products" /&gt;
                <br />
              </code>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Library.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Library);
