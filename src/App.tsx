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
import { useTranslation } from 'react-i18next'
import copy from 'copy-to-clipboard'

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

  const sendKeyPair = () => {
    if (!keyPair) return;

    copy(keyPair.publicKey);
    window.Telegram.WebApp.sendData(keyPair.publicKey)
    window.Telegram.WebApp.close()
  }

  const { t, i18n } = useTranslation()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang === "zh" || lang === "en") {
      i18n.changeLanguage(lang)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className='flex flex-col items-center min-h-screen'>
        <div className='flex flex-1 flex-col w-full space-y-8 max-w-md px-4 mt-16'>
          <h1 className='font-bold text-2xl'>{t("title")}</h1>
          <Alert variant="destructive">
            <AlertDescription>
              <h1>{t("instruction.title")}</h1>
              <ul>
                <li>{t("instruction.step1")}</li>
                <li>{t("instruction.step2")}</li>
                <li>{t("instruction.step3")}</li>
                <li>{t("instruction.step4")}</li>
              </ul>
              </AlertDescription>
          </Alert>
          <div className='flex flex-col space-y-4'>
            <div className='flex flex-col space-y-2 items-start'>
              <Label htmlFor='publicKey'>{t("public_key")}</Label>
              <div className='flex items-center w-full relative'>
                <Textarea rows={2} id='publicKey' value={keyPair?.publicKey || ""} readOnly className='pr-10 resize-none' />
                <CopyButton content={keyPair?.publicKey || ""} variant="outline" size="icon" className='absolute top-0 right-0 border-l-0 border-b-0 rounded-none rounded-tr-md rounded-bl-md' />
              </div>
            </div>
            <div className='flex flex-col space-y-2 items-start'>
              <Label htmlFor='privateKey'>{t("private_key")}</Label>
              <div className='flex items-center w-full relative'>
                <Textarea rows={2} id='privateKey' value={keyPair?.privateKey || ""} readOnly className='pr-10 resize-none' />
                <CopyButton content={keyPair?.privateKey || ""} variant="outline" size="icon" className='absolute top-0 right-0 border-l-0 border-b-0 rounded-none rounded-tr-md rounded-bl-md' />
              </div>
            </div>
            <Button variant="outline" className='w-full' onClick={() => generateKeyPair()}>{t("regenerate")}</Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className='w-full'>{t("use_keypair")}</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>{t("use.alert.title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("use.alert.content")}
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={() => sendKeyPair()}>{t("confirm")}</AlertDialogAction>
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
