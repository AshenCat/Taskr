import React, { useEffect } from 'react';
import useStore from '../../../state';
import {motion, useAnimation} from 'framer-motion';
import './toast.scss';
import { VscWarning } from 'react-icons/vsc';
import Button from '../../../_components/Button';

function Toast() {
    const {toastOpen, setToastOpen, toastMessage, toastVariant} = useStore(state=>state)
    const controls = useAnimation();

    useEffect(() => {
        if (toastOpen) {
            setTimeout(()=>setToastOpen(false), 5000);
            controls.start('show')
        }
        else if (!toastOpen) {
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
                    y: -120
                }
            }}
            initial="hide"
            animate={controls}
            exit="hide"
            className={`custom-toast ${toastVariant ?? ''}`}>
                <div className="d-flex h-100 center p-2">
                    <div className="icon center">
                        <VscWarning />
                    </div>
                    <div className="text">
                        {toastMessage}
                    </div>
                </div> 
                <div>
                    <Button className='w-100 bgless' onClick={onDismissClick}>Dismiss</Button>
                </div>
        </motion.aside>
    )
}

export default Toast