import { WarningFilled,ExclamationCircleFilled, CheckCircleFilled} from '@ant-design/icons';
import { notification } from 'antd';

import './Toast.scss'

export default function openNotification(props){

  notification.open({
    message: props.title,
    description:props.message,
    duration: 5,
    className: 'toast-'+props.mode,
    icon: IconMode(props.mode)
  });
};



function IconMode(mode){
    if(mode == 'danger' ){
      return(
        <WarningFilled
        style={{
          color: 'red',
          fontSize : '30px'
        }}
      />
      ) 
    }else if(mode == 'warning'){
      return(
        <WarningFilled
        style={{
          color: '#ffc400',
          fontSize : '30px'
        }}
      />
      )
    }else if(mode == 'success'){
      return(
        <CheckCircleFilled
        style={{
          color: '#11ff00',
          fontSize : '30px'
        }}
      />
      )
    }else{
      return(
        <ExclamationCircleFilled
        style={{
          color: '#00aaff',
          fontSize : '30px'
        }}
      />
      )
    }
}

