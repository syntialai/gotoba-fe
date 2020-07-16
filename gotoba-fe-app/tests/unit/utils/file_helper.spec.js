import previewImage from '@/utils/fileHelper';

describe('fileHelper.js', () => {
  it('Check previewImage function to return image Promise', () => {
    const file = 'image.png';
    const e = {
      target: { result: 'image.png' },
    };
    const readAsDataURL = jest.spyOn(FileReader.prototype, 'readAsDataURL').mockImplementation(() => null);

    const expectedData = new Promise((resolve, reject) => {
      resolve(e.target.result);
      reject({ error: null });
    });
    const actualData = previewImage(file);

    expect(readAsDataURL).toHaveBeenCalledTimes(1);
    expect(readAsDataURL).toHaveBeenCalledWith(file);

    expect(actualData).toStrictEqual(expectedData);
    expect(actualData).resolves.toEqual(e.target.result);
    expect(actualData).rejects.toStrictEqual({ error: null });
  });
});