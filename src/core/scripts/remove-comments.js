const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')

const { execSync } = require('child_process')

const loadFormatter = () => {
  try {
    console.log('Trying to load prettier...')
    execSync('prettier --version')
    console.log('Loaded prettier')
    return { type: 'prettier', module: null }
  } catch (err) {
    console.error('Failed to load prettier, trying Eslint', err)
    try {
      console.log('Trying to load eslint')
      return {
        type: 'eslint',
        module: new (require('eslint').CLIEngine)({ fix: true }),
      }
    } catch {
      console.error('Failed to load eslint')
      return null
    }
  }
}

const formatter = loadFormatter()

function removeSingleLineComments(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) throw err
    const comments = data.match(/\/\/(?!.*\*).*?(?=\n|$)/g)
    console.log(`Removed comments: ${comments}`)
    const cleanedData = data.replace(/\/\/(?!.*\*).*?(?=\n|$)/g, '')
    fs.writeFile(filePath, cleanedData, 'utf8', (err) => {
      if (err) throw err
      console.log(`Removed comments from ${filePath}`)
      if (formatter) {
        try {
          if (formatter.type === 'prettier') {
            execSync(`prettier --write ${filePath}`)
            console.log(`Formatted ${filePath}`)
          } else if (formatter.type === 'eslint') {
            const report = formatter.module.executeOnText(cleanedData, filePath)
            formatter.module.outputFixes(report)
            const formattedData =
              (report.results[0] && report.results[0].output) || cleanedData
            fs.writeFile(filePath, formattedData, 'utf8', (err) => {
              if (err) throw err
              console.log(`Formatted ${filePath}`)
              // log the amount of lines and which line
              const lines = formattedData.split('\n')
              lines.forEach((line, index) => {
                if (line !== data.split('\n')[index]) {
                  console.log(`Line ${index + 1}: ${line}`)
                }
              })
            })
          }
        } catch (e) {
          console.error('Failed to format the data', e)
        }
      }
    })
  })
}

function findAndCleanUpComments(baseDir, fileName) {
  const files = fs.readdirSync(baseDir)
  files.forEach((file) => {
    const fullPath = path.join(baseDir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      findAndCleanUpComments(fullPath, fileName)
    } else if (file === fileName) {
      removeSingleLineComments(fullPath)
    }
  })
}

if (process.argv.length !== 3) {
  console.log('Usage: node cleanup-comments-simple.js <filename>')
  process.exit(1)
}

const fileName = process.argv[2]
// Directly specify the path to the 'src' directory from the script's location
findAndCleanUpComments(path.resolve(__dirname, '../../'), fileName)
