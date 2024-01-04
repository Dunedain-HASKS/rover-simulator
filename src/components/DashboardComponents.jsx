import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function DashboardComponent({ title: title }) {
    return (
        <Paper style={{ padding: '20px', textAlign: 'center' }}>
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body1">
                This is the content of {title}.
            </Typography>
        </Paper>
    );
}

DashboardComponent.propTypes = {
    title: PropTypes.string.isRequired,
};

export default DashboardComponent;
