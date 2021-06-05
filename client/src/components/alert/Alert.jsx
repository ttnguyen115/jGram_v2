import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './Loading';
import Toast from './Toast';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';

const Notify = () => {
    const { alertReducer } = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div>
            { alertReducer.loading && <Loading /> }
            
            { alertReducer.success &&
                <Toast 
                    status="success" 
                    msg={ alertReducer.success } 
                    handleOpen={true} 
                    handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                /> 
            }

            { alertReducer.error &&
                <Toast 
                    status="error" 
                    msg={ alertReducer.error } 
                    handleOpen={true} 
                    handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
                /> 
            }

        </div>
    )
}

export default Notify
