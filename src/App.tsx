import './App.css'
import { Alert, AlertDescription } from './components/ui/alert'
import { Button } from './components/ui/button'
import { Label } from './components/ui/label'
import { PrivateKey } from "@wharfkit/antelope"
import { useEffect, useState } from 'react'
import CopyButton from './components/CopyButton'
import { Textarea } from './components/ui/textarea'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from './components/ui/alert-dialog'
import github from './assets/github.svg'

function App() {
  const [keyPair, setKeyPair] = useState<{
    publicKey: string
    privateKey: string
  }>()

  useEffect(() => {
    generateKeyPair()
  }, [])

  const generateKeyPair = async () => {
    const privateKey = await PrivateKey.generate("K1")
    const publicKey = privateKey.toPublic()
    publicKey.toLegacyString("EOS")

    setKeyPair({
      publicKey: publicKey.toLegacyString("EOS"),
      privateKey: privateKey.toWif()
    })
  }

  return (
    <>
      <div className='flex flex-col items-center min-h-screen'>
        <div className='flex flex-1 flex-col w-full space-y-8 max-w-md px-4 mt-16'>
          <h1 className='font-bold text-2xl'>Generate EOS Keypair</h1>
          <Alert variant="destructive">
            <AlertDescription>
              We recommend that you generate your public and private keys offline. After generating the keys, please be sure to record and store your private key safely. Do not disclose private key information to anyone!
            </AlertDescription>
          </Alert>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-2 items-start'>
              <Label htmlFor='publicKey'>Public Key</Label>
              <div className='flex items-center w-full relative'>
                <Textarea rows={2} id='publicKey' value={keyPair?.publicKey || ""} readOnly className='pr-10 resize-none' />
                <CopyButton content={keyPair?.publicKey || ""} variant="outline" size="icon" className='absolute top-0 right-0 border-l-0 border-b-0 rounded-none rounded-tr-md rounded-bl-md' />
              </div>
            </div>
            <div className='flex flex-col space-y-2 items-start'>
              <Label htmlFor='privateKey'>Private Key</Label>
              <div className='flex items-center w-full relative'>
                <Textarea rows={2} id='privateKey' value={keyPair?.privateKey || ""} readOnly className='pr-10 resize-none' />
                <CopyButton content={keyPair?.privateKey || ""} variant="outline" size="icon" className='absolute top-0 right-0 border-l-0 border-b-0 rounded-none rounded-tr-md rounded-bl-md' />
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='w-full'>Generate</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  Generate a new key pair will overwrite the current key pair. Are you sure you want to proceed?
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => generateKeyPair()}>Generate</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
        <div className='py-4 flex flex-col items-center space-y-1'>
          <a href='https://github.com/offline-studio/eos-keypair-generator' target='_blank'>
            <img src={github} alt='Github' className='w-6 h-6' />
          </a>
          <span className='text-sm opacity-70'>Power by <a href='https://github.com/offline-studio' target='_blank' className='underline underline-offset-2'>Offline Studio</a></span>
        </div>
      </div>
    </>
  )
}

export default App
