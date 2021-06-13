import React from "react";
import TodosForm from "./TodosForm";
import Button from "./Button";
import { device } from "../helpers/breakpoints";
import styled from "styled-components";

const ModalContent = styled.div`
    background: var(--white);
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    z-index: 999;
    width: 100%;
    max-width: 480px;
    left: calc(50% - 240px);
    top: 100px;
    padding: 48px;
    position: absolute;

    @media ${device.mobile} {
        max-width: unset;
        left: calc(50% - 170px);
        width: 340px;
        padding: 0;
    }
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.91);
`;

const ButtonClose = styled.div`
    position: absolute;
    top: 1rem;
    right: 1rem;
`;

export default function Modal({
    modalRef,
    modalVisible,
    toggleModal,
    date,
    title,
    description,
    category,
    handleSubmit,
    handleTitleOnChange,
    handleDescriptionOnChange,
    handleDateOnChange,
    handleCategoryOnChange,
}) {
    return modalVisible ? (
        <div id="modalEl">
            <ModalContent ref={modalRef}>
                <TodosForm
                    handleSubmit={handleSubmit}
                    handleTitleOnChange={handleTitleOnChange}
                    handleDescriptionOnChange={handleDescriptionOnChange}
                    handleDateOnChange={handleDateOnChange}
                    handleCategoryOnChange={handleCategoryOnChange}
                    title={title}
                    description={description}
                    date={date}
                    category={category}
                />
                <ButtonClose>
                    <Button onClick={toggleModal} type="closeButton"></Button>
                </ButtonClose>
            </ModalContent>
            <ModalOverlay />
        </div>
    ) : null;
}
