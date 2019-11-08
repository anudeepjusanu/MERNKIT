import React, { useState } from 'react';
import ColorPicker from 'components/ColorPicker/ColorPicker';
import { Grid, Typography, Button, RadioGroup, FormControlLabel, Radio, ReactFragment } from '@material-ui/core';
import { connect } from 'react-redux';
import { appActions } from 'actions';
import reactCSS from 'reactcss';
import { history } from 'helpers';
import './style.scss';
import { ColorExtractor } from 'react-color-extractor';
import { FileUploadInput } from 'components/FormInputs';
import ThemeImg1 from 'images/themeImg.png';
import { object } from 'prop-types';

function Theme(props) {
    const [colors, setColors] = useState({
        primary: props.primary,
        secondary: props.secondary,
        tertiary: props.tertiary,
    });
    const [themecolors, setthemeColors] = useState({
        primary: props.primary,
        secondary: props.secondary,
        tertiary: props.tertiary,
    });
    const [imageColors, setImageColors] = useState([]);
    const [image, setImage] = useState('');
    const imageUrl = '';
    const handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker });
    };

    const handleClose = () => {
        this.setState({ displayColorPicker: false });
    };

    const handleChange = (color, type) => {
        colors[type] = color;
        setColors(colors);
        props.updateColor(colors);
        // this.setState({ color: color.hex });
        // if (type === 'primary') {
        //   this.props.updateColor({ color: c, primary: c, type: 'primary' });
        // } else if (type === 'secondary') {
        //   this.props.updateColor({ color: c, secondary: c, type: 'secondary' });
        // } else if (type === 'tertiary') {
        //   this.props.updateColor({ color: c, tertiary: c, type: 'tertiary' });
        // }
    };

    const renderSwatches = () =>
        imageColors.map((color, id) => (
            <div
                key={id}
                style={{
                    backgroundColor: color,
                    width: 100,
                    height: 100,
                }}
            />
        ));

    const submitTheme = (e) => {
        props.updateColor(colors);
        history.push('/dashboard');
    };
    const submitActiveTheme = (e, data) => {
        var colorObj = {
            primary: data.theme[0],
            secondary: data.theme[1],
            tertiary: data.theme[2],
        }
        setColors(colorObj);

        props.updateColor(colorObj);

        // history.push('/dashboard');
    };

    const submitLogoTheme = () => {
        setColors({
            primary: imageColors[0],
            secondary: imageColors[1],
            tertiary: imageColors[2],
        });
        props.updateColor(colors);
        // history.push('/dashboard');
    };

    const getColors = (colors) => {
        console.log(colors);
        setImageColors(colors);
    };
    const selectImage = (e) => {
        if (e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const styles = reactCSS({
        default: {
            heading: {
                color: props.tertiary,
            },
        },
    });

    const defaultThemeColor = [
        {
            image: ThemeImg1,
            theme: ['#263a81', '#0bc8e6', '#fd9f3a']
        },
        {
            image: ThemeImg1,
            theme: ['#46efa9', '#ef8c46', '#aba8b9']
        },
        {
            image: ThemeImg1,
            theme: ['#0bc8e6', '#138c1c', '#a73c37a8']
        },
    ];

    // const [value, setValue] = React.useState('theme1');

    // const handleChangeTheme = (event) => {
    //   setValue(event.target.value);
    // };

    const StyledThemeList = (props) => (
        <Grid container spacing={6}>
            {props.DefaultTheme && props.DefaultTheme.map((data, i) => (
                <Grid item xs={3} key={i}>
                    <div className="themeListMain">
                        <img src={data.image} alt="themeImg 1" width="100%" />
                        <Grid container spacing={3}>
                            {data.theme.map((data, j) => (
                                <Grid item xs={4} key={j}>
                                    <div className="default_color">
                                        <span style={{ backgroundColor: data }}></span>
                                        <small>{data}</small>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                        <Typography variant="h5" color="primary">
                            Nexon Theme
            </Typography>
                        <Button
                            variant="contained"
                            size="large"
                            color="secondary"
                            className="btn"
                            onClick={(e) => submitActiveTheme(e, data)}
                        >
                            Activate
            </Button>
                    </div>
                </Grid>
            ))}
        </Grid>
    );

    return (
        <Grid container className="container">
            <Grid item xs={12} className="main_content">
                <Typography variant="h4" color="primary" className="productsName">
                    Configure Theme
        </Typography>
                <br />
                <Grid container>
                    <Grid item xs={12} className="avail_theme">
                        <Typography component="h6" className="content_title">
                            Available themes
            </Typography>
                        <StyledThemeList DefaultTheme={defaultThemeColor} />
                    </Grid>
                </Grid>
                <br /><br />
                <Grid container>
                    <Typography component="h6" className="content_title">
                        Custom themes
          </Typography>
                    <Grid container>
                        <Grid item md={2}>
                            <Typography variant="h6" color="primary" className="productsName">
                                Primary Color
              </Typography>
                            <ColorPicker
                                type="primary"
                                color={props.primary}
                                handleChange={(e) => handleChange(e, 'primary')}
                                handleClose={handleClose}
                                handleClick={handleClick}
                            />
                        </Grid>
                        <Grid item md={2}>
                            <Typography variant="h6" color="secondary" className="productsName">
                                Secondary Color
              </Typography>
                            <ColorPicker
                                type="secondary"
                                color={props.secondary}
                                handleChange={(e) => handleChange(e, 'secondary')}
                                handleClose={handleClose}
                                handleClick={handleClick}
                            />
                        </Grid>
                        <Grid item md={2}>
                            <Typography
                                variant="h6"
                                style={styles.heading}
                                color={props.tertiary}
                                className="productsName"
                            >
                                Tertiary Color
              </Typography>
                            <ColorPicker
                                type="tertiary"
                                color={props.tertiary}
                                handleChange={(e) => handleChange(e, 'tertiary')}
                                handleClose={handleClose}
                                handleClick={handleClick}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid Container>
                    <Grid item md={2}>
                        <Button
                            type="button"
                            onClick={submitTheme}
                            aria-label="Collapse"
                            variant="contained"
                            size="large"
                            color="secondary"
                            className="btn"
                        >
                            Save
            </Button>
                    </Grid>
                </Grid>
                <br />
                <Grid>
                    <ColorExtractor getColors={getColors} src={image} />
                    <input
                        type="file"
                        name="pic"
                        accept="image/*"
                        onChange={selectImage}
                    />
                    <img src={image} alt={image} />
                    <div
                        style={{
                            marginTop: 20,
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <br />
                        {imageColors && imageColors.length > 0 && (
                            <Button
                                type="button"
                                onClick={submitLogoTheme}
                                aria-label="Collapse"
                                variant="contained"
                                size="large"
                                color="secondary"
                                className="btn"
                            >
                                Save
              </Button>
                        )}
                        {renderSwatches()}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
}

function mapStateToProps(state) {
    const { app } = state.appReducer;
    return {
        primary: state.appReducer.app.primary,
        secondary: state.appReducer.app.secondary,
        tertiary: state.appReducer.app.tertiary,
        app,
    };
}

const mapDispatchToProps = (dispatch) => ({
    updateColor: (values) => {
        dispatch(appActions.changeColor(values));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Theme);
