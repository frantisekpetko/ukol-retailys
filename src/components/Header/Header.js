import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

const Header = () => {
    return <AppBar position="static" color={'transparent'}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Ukol pro Retailys
            </Typography>
        </Toolbar>
    </AppBar>
};

export default Header;