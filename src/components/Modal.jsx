import React from "react";
import TodosForm from "./TodosForm";

export default function Modal({
    wrapperRef,
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
        <div id="modalEl" ref={wrapperRef}>
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
            <button onClick={toggleModal}>X</button>
        </div>
    ) : null;
}
