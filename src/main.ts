import {getInput, setFailed} from '@actions/core'

import {downloadMinikube} from './download'
import {startMinikube} from './start'

// main thing :)
const run = async (): Promise<void> => {
  try {
    let minikubeVersion = getInput('minikube-version').toLowerCase()
    minikubeVersion = minikubeVersion === 'stable' ? 'latest' : minikubeVersion
    const binPath = getInput('bin-path');
    await downloadMinikube(minikubeVersion, binPath)
    await startMinikube()
  } catch (error) {
    if (error instanceof Error) {
      setFailed(error.message)
    }
  }
}

run()
