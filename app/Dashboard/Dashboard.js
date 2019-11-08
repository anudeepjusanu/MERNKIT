/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid, Typography, Button } from '@material-ui/core';
import './style.scss';
import DynamicTable from 'components/DynamicTable';
import { userActions } from 'actions';
import { history } from 'helpers';
function Dashboard(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: 'firstName',
      label: 'First Name',
      options: {
        selectableRows: true,
        autoWidth: false,
        sort: false
      }
    },
    {
      name: 'lastName',
      label: 'Last Name'
    },
    {
      name: 'email',
      label: 'Email'
    }
  ];
  const options = {
    filterType: 'dropdown',
    responsive: 'stacked',
    hasIndex: true,
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    rowHover: true,
    selectableRows: false
  };
  useEffect(() => {
    props.getUsers();
  }, []);

  useEffect(() => {
    console.log(props.users);
    setUsers(props.users);
    setLoading(false);
  }, [props.status]);

  const addUser = (e) => {
    e.stopPropagation();
    history.push('/addUser');
  };

  // catalogue search
  return (
    <Grid>
      <Grid container className="container">
        <Grid item xs={12} className="main_content">
          {/* Dashboard Main content */}
          <Typography component="h6" className="content_title">
            Hello
          </Typography>
          <Grid container>
            <Button type="button" variant="outlined" size="large" color="secondary" onClick={addUser} className="btn large" >
              Create Account
            </Button>
            <Grid item xs={12}>
              <Grid container className="dashboard">
                <DynamicTable
                  columns={columns}
                  options={options}
                  data={users}
                  title="List of Users"
                  noDataText="No Users here, please add some"
                  loading={loading}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapStateToProps(state) {
  const { app } = state.appReducer;
  return {
    app,
    users: state.appReducer.users.users,
    status: state.appReducer.users.status,
    newUser: state.appReducer.users.newUser
  };
}

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => {
    dispatch(userActions.getUsers([]));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

