import { get } from 'lodash-es';
import { ofetch } from 'ofetch';

import { ErrorExit, FileManager, join, logger, SOURCE_DIR } from './utils';

const baseURL = 'https://api.github.com/repos/bambulab/BambuStudio/contents';

interface ModelFile {
  name: string;
  path: string;
  type: 'file' | 'dir';
}

async function getModelFiles() {
  // https://github.com/bambulab/BambuStudio/tree/master/resources/printers
  const modelFiles = await ofetch<ModelFile[]>('/resources/printers', { baseURL });

  return modelFiles
    .filter((file) => file.type === 'file' && file.name.endsWith('.json') && file.name !== 'filaments_blacklist.json')
    .map((file) => file.name);
}

interface ModelFileInfo {
  type: 'file' | 'dir';
  content: string;
  encoding: 'base64';
}

(async function () {
  logger.debug('Fetching model files ...');
  const modelFiles = await getModelFiles();

  logger.info(`Found ${modelFiles.length} model files: ${modelFiles.join(', ')}`);

  const printers: Record<string, string> = {};

  for (const modelFile of modelFiles) {
    logger.debug(`Fetching model file ${modelFile} ...`);
    const modelFileInfo = await ofetch<ModelFileInfo>(`/resources/printers/${modelFile}`, { baseURL });

    if (modelFileInfo.type !== 'file') ErrorExit(`${modelFile} is not a file`);
    if (modelFileInfo.encoding !== 'base64') ErrorExit(`${modelFile} is not encoded in base64`);

    const modelContent = Buffer.from(modelFileInfo.content, 'base64').toString('utf-8');
    const model = JSON.parse(modelContent);

    const info = get(model, '00.00.00.00');
    if (!info) ErrorExit(`${modelFile} does not have a 00.00.00.00 key`);

    let displayName = get(info, 'display_name');
    const printerType = get(info, 'printer_type');
    if (!displayName || !printerType) ErrorExit(`${modelFile} does not have a display_name or printer_type key`);

    displayName = displayName.replace('Bambu Lab', '').trim();

    printers[displayName] = printerType;

    logger.info(`${displayName}: ${printerType}`);
  }

  FileManager.writeJson(join(SOURCE_DIR, 'printers.json'), printers);
  logger.info('Printers saved to printers.json');
})();
