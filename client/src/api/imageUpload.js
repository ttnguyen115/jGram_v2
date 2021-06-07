export const checkImage = (file) => {
    let err = '';

    if (!file) return err = 'File does not exist!';

    if (file.size > 1024 * 1024) return err = 'File size is too large!';

    if (file.type !== 'image/jpeg' && file.type !== 'image/png') return err = 'Image format is incorrect!';

    return err;
}