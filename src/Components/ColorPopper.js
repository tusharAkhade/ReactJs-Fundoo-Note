import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    colorIcon: {
        height: "100%",
        width: "40px",
        cursor: "pointer",
        borderRadius: "50%",
        opacity: "0.7",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    },
    mainContainer: {
        height: "100%",
        width: "40px",
        cursor: "pointer",
        borderRadius: "50%",
    },
    mainContainerHover: {
        boxShadow: "inset 1px 50px 0 rgba(0, 0, 0, 0.1)",
        borderRadius: "50%",
        height: "100%",
        width: "40px",
        cursor: "pointer",
    },    
    colorContainer: {
        width: `150px`,
        border: "1px solid",
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        zIndex: "100",
        flexWrap: "wrap",
        boxShadow: "1px 1px 5px grey",
        border: "none",
        borderRadius: "5px",
    },
    colorItem: {
        border: "1px solid",
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        margin: "1px",
        cursor: "pointer",
        opacity: "0.7",
    },
    colorItemHover: {
        border: "2px solid",
        width: "28px",
        height: "28px",
        borderRadius: "50%",
        margin: "1px",
        cursor: "pointer",
        opacity: "1",
    }

}));

export default function SimplePopper(props) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMouseEnter = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleMouseLeave = (event) => {
        setAnchorEl(null);
    }

    const handleMouseOverColor = (event) => {
        event.target.className = `${classes.colorItemHover}`
    }

    const handleMouseOutColor = (event) => {
        event.target.className = `${classes.colorItem}`
    }

    const colorClockHandler = (e) => {
        props.getColor(e.target.id)
        console.log(e.target.id) 
    } 

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const colors = [ "#fff", "#f28b82", "#fbbc04", "#fff475", "#ccff90", "#a7ffeb", "#cbf0f8", "#aecbfa", "#d7aefb", "#fdcfe8", "#e6c9a8", "#e8eaed"]

  return (
    <div className={classes.mainContainer} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
        <div className={classes.colorIcon} >
        </div>

        <Popper id={id} open={open} placement="top" anchorEl={anchorEl}>
            <div className={classes.colorContainer} >
                {
                    colors.map((color) => <div onClick={colorClockHandler} id={color} style={{backgroundColor:`${color}`}} className={classes.colorItem} onMouseOut={handleMouseOutColor} onMouseOver={handleMouseOverColor} /> )
                }
            </div>
        </Popper>
    </div>
  );
}
