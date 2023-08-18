import React from "react";
import "../CSS/modal.css";
import { AnimatePresence, motion } from "framer-motion";
import "../CSS/app.css";

const ModalFormBuilder = (props) => {
  return (
    <AnimatePresence>
      {props.open && (
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3,
              },
            }}
            className="modal-backdrop"
          />

          {props.children}
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalFormBuilder;
