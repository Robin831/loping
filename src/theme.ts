const constants = {
    pageHeaderHeight: '10rem',
    pageHeaderMargin: '0.5rem',
};

const calculatedPageHeaderSize = `calc(${constants.pageHeaderHeight} + ${constants.pageHeaderMargin})`;

const colors = {
    semiDarkBlue: '#aac2d6',
    darkBlue: '#00447e',
    darkDarkBlue: '#021d33',
    lightBlue: '#009fdf',
    orange: '#ec6825',
    danger: '#dc3545',
    fire: '#af2121'
};

const selectableElement = (isSelected: boolean) => `
    cursor: pointer;
    transition: background-color 50ms cubic-bezier(0.4, 0, 0.2, 1);
    ${isSelected
        ? `background: ${colors.semiDarkBlue} !important; 
         color: ${colors.darkDarkBlue};
         padding: 5px;
         `
        : `
         &:hover{
            background: #eee;
         }
         &:active {
             transform: scale(0.99);
             transition: color 200ms ease-in 50ms
         }
         `
    }
    &:hover{
        background: #eee;
    }
`;

const selectableText = (isSelected: boolean) => `
    cursor: pointer;
    transition: background-color 50ms cubic-bezier(0.4, 0, 0.2, 1);
    padding: 3px 6px;
    ${isSelected
        ? `
        font-weight: 500 !important;
        transition: background-color 50ms cubic-bezier(0.4, 0, 0.2, 1);
        background: ${colors.semiDarkBlue} !important; 
        color: ${colors.darkDarkBlue};
        padding: 3px 6px;
         `
        : `
         &:hover{
             background: #eee;
         }
         &:active {
             transform: scale(0.99);
             transition: color 200ms ease-in 50ms
         }
         `
    }
    &:hover{
        font-weight: 500;
    }
`;

const clickable = (scale?: number) => `
    cursor: pointer;
   
    &:active {
        transform: scale(${scale ?? 0.99});
        transition: color 200ms ease-in 50ms
    }
`;

const card = () => `
    box-shadow: rgb(204 204 204) 0px 2px 6px 2px;
    padding: 1rem;
`;

export default {
    colors: colors,
    constants: constants,
    calculatedPageHeaderSize: calculatedPageHeaderSize,
    contentHeight: `calc(100vh - ${calculatedPageHeaderSize})`,
    headerColor: colors.fire,
    selectableElement: selectableElement,
    selectableText: selectableText,
    card: card,
    clickable: clickable,
};
