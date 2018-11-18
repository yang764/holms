const config = {
  target: '#uppyHolder',
  // trigger: '#UppyModalOpenerBtn',
  endpoint: 'fakeServer',
  DashboardInline: true,
  autoProceed: false,
  restrictions: {
    maxFileSize: 100000,
    maxNumberOfFiles: 1,
    minNumberOfFiles: 1,
    allowedFileTypes: ['image/*']
  },
  metaFields: [
    {
      id: 'resizeTo',
      name: 'Resize to',
      value: 1200,
      placeholder: 'specify future image size'
    },
    {
      id: 'description',
      name: 'Description',
      value: 'none',
      placeholder: 'describe what the file is for'
    }
  ]
};
export default config;
