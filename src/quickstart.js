const path = require('path')
const p = require('@xhubiotable/processor')
const {LoggerMemory} = require('@xhubiotable/logger')
const GeneratorPerson = require('./GeneratorPerson').GeneratorPerson

async function doIt() {
    const logger = new LoggerMemory()
    logger.writeConsole = true
    const fileProcessor = await
    p.createDefaultFileProcessor(logger)
    const processor = new p.Processor({
        logger,
        generatorRegistry: p.createDefaultGeneratorRegistry(),
        writer: p.createDefaultWriter(logger)
    })
	const genPerson = new GeneratorPerson({ logger })
	processor.generatorRegistry.registerGenerator('generatorPerson', genPerson)
    await
    fileProcessor.load(path.join('resources', 'quickstart.xlsx'))
    processor.tables = fileProcessor.tables
    await
    processor.process()
}

doIt().then(() => {
    console.log('Finish')
}).catch(err => {
    console.log(err)
})