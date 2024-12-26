import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastMessage = ({ message, type }) => {
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        if (!hasShown && message) {
            const showToast = (type, message) => {
                const options = {
                    autoClose: type === 'error' ? 5000 : 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                };

                switch (type) {
                    case 'success':
                        toast.success(message, options);
                        break;
                    case 'error':
                        toast.error(message, options);
                        break;
                    case 'info':
                        toast.info(message, options);
                        break;
                    case 'warning':
                        toast.warning(message, options);
                        break;
                    default:
                        break;
                }
            };

            showToast(type, message);
            setHasShown(true);
        }
    }, [message, type, hasShown]);

    return <ToastContainer />;
};

export default ToastMessage;
