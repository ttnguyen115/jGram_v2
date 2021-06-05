import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        width: '100%',
    },

    bar: {
        backgroundColor: '#000',
    }
});

const Loading = () => {
    const classes = useStyles();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setProgress((oldProgress) => {
            if (oldProgress === 100) {
            return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
        });
        }, 500);

        return () => {
        clearInterval(timer);
        };
    }, []);

    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={progress} className={classes.bar} />
        </div>
    );
}

export default Loading
