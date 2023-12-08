export const createLinkElement = (imageData: string, name: string) => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = imageData;
    link.download = name;
    link.click();
    document.body.removeChild(link);
};
