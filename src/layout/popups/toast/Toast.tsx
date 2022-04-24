import React, { useEffect } from 'react';
import useStore from '../../../state';
import {motion, useAnimation} from 'framer-motion';
import './toast.scss';
import { VscCheck, VscInfo, VscWarning } from 'react-icons/vsc';
import Button from '../../../_components/Button';
import { errorConstants, todoConstants } from '../../../../constants';

interface INotificationData {
    category: string;
    type: string;
    silent: boolean;
    variant: string;
    message: string;
    metaData: any;
}

function Toast() {
    const {toastOpen, setToastOpen, setToastMessage, setToastVariant, toastMessage, toastVariant} = useStore(state=>state)
    const controls = useAnimation();

    useEffect(() => {
        window.electron.receive(errorConstants.TODO_ERROR, (data: INotificationData) => {
            setToastOpen(false)
            setToastVariant(data.variant);
            setToastMessage(data.message);
            setToastOpen(true);
        })
        window.electron.receive(todoConstants.CREATE_TODO, (data: INotificationData) => {
            setToastOpen(false)
            setToastVariant(data.variant);
            setToastMessage(data.message);
            setToastOpen(true);
            window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, null);
        })
        window.electron.receive(todoConstants.ARCHIVE_TODO, (data: INotificationData) => {
            setToastOpen(false)
            setToastVariant(data.variant);
            setToastMessage(data.message);
            setToastOpen(true);
            window.electron.todoApi(todoConstants.GET_USER_PENDING_TODO, null);
        })
        return () => {
            window.electron.removeAllListeners(errorConstants.TODO_ERROR)
            window.electron.removeAllListeners(todoConstants.CREATE_TODO)
            window.electron.removeAllListeners(todoConstants.ARCHIVE_TODO)
        }
    }, [])

    useEffect(() => {
        if (toastOpen) {
            // console.log('show')
            setTimeout(()=>setToastOpen(false), 5000);
            controls.start('show')
        }
        else if (!toastOpen) {
            // console.log('hide')
            controls.start('hide')
        }
    }, [toastOpen])

    const onDismissClick = () => {
        setToastOpen(false)
    }

    return (
        <motion.aside 
            variants={{
                show: {
                    y: 0
                },
                hide: {
                    y: -150
                }
            }}
            initial="hide"
            animate={controls}
            exit="hide"
            className={`custom-toast ${toastVariant ?? ''}`}>
                <div className="d-flex h-100 center p-2">
                    <div className="icon center">
                        {toastVariant === 'WARNING' && <VscWarning />}
                        {toastVariant === 'DANGER' && <VscWarning />}
                        {toastVariant === 'INFO' && <VscInfo />}
                        {toastVariant === 'SUCCESS' && <VscCheck />}
                    </div>
                    <div className="text center">
                        <span>{toastMessage}</span>
                    </div>
                </div> 
                <div>
                    <Button className='w-100 bgless' onClick={onDismissClick}>Dismiss</Button>
                </div>
        </motion.aside>
    )
}

export default Toast