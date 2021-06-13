import React from "react";
import TodosForm from "./TodosForm";
import styled from "styled-components";

const ModalContent = styled.div`
    background: var(--white);
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.15);
    border-radius: 15px;
    z-index: 999;
    width: 100%;
    max-width: 600px;
    left: calc(50% - 300px);
    top: 150px;
    padding: 48px 96px;
    position: absolute;
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

const ButtonClose = styled.button`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: var(--primary-blue);
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 0 2px 4px var(--button-primary-blue-shadow);

    &:hover {
        transition: all ease-in-out 0.2s;
        box-shadow: 0 2px 2px var(--button-primary-blue-shadow);
        transform: scale(1);
    }

    &::after {
        position: absolute;
        content: "";
        width: 12px;
        height: 2px;
        background: var(--white);
        transform: rotate(45deg);
    }

    &::before {
        position: absolute;
        content: "";
        width: 12px;
        height: 2px;
        background: var(--white);
        transform: rotate(-45deg);
    }
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
                <ButtonClose onClick={toggleModal}></ButtonClose>
            </ModalContent>
            <ModalOverlay />
        </div>
    ) : null;
}
