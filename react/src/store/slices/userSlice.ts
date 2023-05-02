import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import useAuthServices from '../../api/useAuthServices';
import IAuthParams from 'src/types/IAuthParams';
import useUserServices from '../../api/useUserSrvices';
import { IUser } from 'src/types/IUser';
import { ISendMoneyParams } from 'src/types/IsendMoneyParams';

interface IAlertMessage{
  text: string;
  alert: 'error' | 'info' | 'success'| 'warning';
}

interface UserState {
  registeredUserData: IAuthParams.IRegisteredUserData| null;
  signUp: boolean;
  alertStatus:boolean;
  alertMessage:IAlertMessage
  usersLoading: boolean
  users: null | IUser[]
  operationLoading: boolean
}

const initialState:UserState = {
  registeredUserData: null,
  alertStatus: false,
  signUp: true,
  alertMessage: {
    text: '',
    alert: 'success',
  },
  usersLoading: false,
  users: null,
  operationLoading: false
};

export const signIn = createAsyncThunk(
  'userSlice/signIn',
  async (data:IAuthParams.ISignInParams) => {
    const { signInUser } = useAuthServices();
    const response = await signInUser(data);
    return response;
  },
);
export const signUp = createAsyncThunk(
  'userSlice/signUp',
  async (data: IAuthParams.ISignUpParams) => {
    const { signUpUser } = useAuthServices();
    const response = await signUpUser(data);
    return response;
  },
);
export const getAllUsers = createAsyncThunk(
  'userSlice/getUsers',
  async () => {
    const { getAllUsers } = useUserServices();
    const response = await getAllUsers();
    return response;
  },
);

export const sendMoneys = createAsyncThunk(
  'userSlice/sendMoneys',
  async (params: ISendMoneyParams) => {
    const { sendMoney } = useUserServices()
    const response = await sendMoney(params)
    return response
  }
)

const UserSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    closeAlertModal: (state) => {
      state.alertStatus = false;
    },
    signOut: (state) => {
      state.registeredUserData = null;
      localStorage.removeItem('registeredUserData');
    },
    getRegisteredUserData: (state, action) => {
      state.registeredUserData = action.payload;
    },
    changeSignUpStatus: (state, action: PayloadAction<boolean>) => {
      state.signUp = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.registeredUserData = action.payload
        localStorage.setItem('registeredUserData', JSON.stringify(action.payload))
      })
      .addCase(signIn.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Введен неверный логин или пароль', alert: 'error' }
      })
      .addCase(getAllUsers.pending, (state) => {
        state.usersLoading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        const users = action.payload.filter((item) => item.name !== state.registeredUserData.name)
        state.users = users
        state.usersLoading = false
      })
      .addCase(signUp.fulfilled, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Регистрация прошла успешно ', alert: 'success' }
      })
      .addCase(signUp.rejected, (state) => {
        state.alertStatus = true;
        state.alertMessage = { text: 'Пользователь с таким Ником уже существует', alert: 'error' }
      })
      .addCase(sendMoneys.pending, (state) => {
        state.operationLoading = true
      })
      .addCase(sendMoneys.rejected, (state) => {
        state.alertStatus = true
        state.operationLoading = false
        state.alertMessage = { text: 'Операция прошла Успешео ', alert: 'success' }
      })
      .addCase(sendMoneys.fulfilled, (state) => {
        state.alertStatus = true
        state.operationLoading = false
        state.alertMessage = { text: 'Операция прошла Успешео ', alert: 'success' }
      })
  },
});

const { actions, reducer } = UserSlice;

export default reducer;

export const {
  signOut,
  getRegisteredUserData,
  closeAlertModal,
  changeSignUpStatus
} = actions;
