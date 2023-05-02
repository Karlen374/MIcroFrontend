import Box from '@mui/material/Box';
import React from 'react'
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { closeAlertModal } from '../../store/slices/userSlice';
import { Snackbar } from '@mui/material';

const AppAlert = () => {
  const dispatch = useAppDispatch()
  const alertStatus = useAppSelector((store) => store.userSlice.alertStatus)
  const alertMessage = useAppSelector((store) => store.userSlice.alertMessage)

  return (
    <Snackbar open={alertStatus} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} onClose={() => dispatch(closeAlertModal())}>
      <Alert onClose={() => dispatch(closeAlertModal())} severity={alertMessage.alert} sx={{ width: '100%' }}>
        {alertMessage.text}
      </Alert>
    </Snackbar>
  );
};
export default AppAlert;