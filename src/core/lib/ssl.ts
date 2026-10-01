import { CertificateField, generate, SelfsignedOptions } from 'selfsigned';
import { APP_CONFIG } from '#shared/constants.ts';

export async function generateCerts() {
  // certificate attributes
  const certAttrs: CertificateField[] = [
    { name: 'commonName', value: APP_CONFIG.APP_NAME, type: '' },
  ];
  // certificate options
  const certOptions: SelfsignedOptions = {
    notAfterDate: new Date('2099-12-31'),
    algorithm: 'sha256',
    extensions: [
      {
        name: 'subjectAltName',
        altNames: [],
      },
    ],
  };

  const pems = await generate(certAttrs, certOptions);
  return {
    cert: pems.cert,
    key: pems.private,
  };
}
