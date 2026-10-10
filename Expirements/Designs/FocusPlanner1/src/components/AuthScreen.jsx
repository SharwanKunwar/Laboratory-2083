import { useState } from 'react';
import { Button, Form, Input, Segmented, Typography } from 'antd';
import { ArrowRight, Eye, EyeOff, Focus, Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

const { Paragraph, Text } = Typography;

export default function AuthScreen({ onAuthenticate, theme, onToggleTheme }) {
    const [mode, setMode] = useState('signin');
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    async function submit(values) {
        setBusy(true);
        setError('');
        try {
            await onAuthenticate(mode, values);
        } catch (requestError) {
            setError(requestError.message || 'Unable to continue. Please try again.');
        } finally {
            setBusy(false);
        }
    }

    return (
        <main className="grid min-h-screen grid-cols-[minmax(0,7fr)_minmax(0,3fr)] gap-0 overflow-y-auto bg-[#e8ede6] p-[60px] max-[700px]:grid-cols-1">
            <motion.section className="relative flex min-h-[calc(100dvh-120px)] flex-col overflow-hidden rounded-l-md bg-[#202d27] px-[45px] py-9 text-[#f0f5ed] max-[700px]:hidden" initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div className="pointer-events-none absolute -right-[150px] bottom-16 size-[470px] rounded-full border border-[#d3e6c71f]" animate={{ rotate: 360 }} transition={{ duration: 75, repeat: Infinity, ease: 'linear' }} />
                <motion.div className="pointer-events-none absolute -right-[74px] bottom-[140px] size-[318px] rounded-full border border-[#d3e6c71f]" animate={{ rotate: -360 }} transition={{ duration: 58, repeat: Infinity, ease: 'linear' }} />
                <div className="z-10 flex items-center gap-2.5 text-sm font-bold"><span className="grid size-[30px] place-items-center rounded-[9px] bg-[#b9d79e] text-[#243a30]"><Focus size={19} /></span><span>FocusPlanner</span></div>
                <div className="z-10 my-auto py-5 pb-[50px]">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>
                        <p className="mb-4 text-[10px] font-bold tracking-[1px] text-[#b9d79e]">LESS NOISE. MORE MEANING.</p>
                        <h1 className="mb-4 mt-[17px] font-display text-[clamp(43px,5vw,64px)] leading-[1.05] text-[#f4f5ed]">Make room<br />for your best work.</h1>
                        <p className="max-w-[345px] text-[13px] leading-[1.8] text-[#b8c4ba]">A thoughtful place to plan your day, protect your attention, and see good work through.</p>
                    </motion.div>
                </div>
                <div className="z-10 flex items-center gap-[11px] text-[10px] text-[#9daa9e]"><span className="h-px w-6 bg-[#b9d79e]" />A little more focus, every day.</div>
            </motion.section>
            <motion.section className="relative grid min-h-[calc(100dvh-120px)] place-items-center rounded-r-md bg-[#fbfcf9] px-[35px] py-[50px] transition-colors max-[700px]:flex max-[700px]:flex-col max-[700px]:justify-start max-[560px]:px-[23px] max-[560px]:py-[25px] max-[700px]:rounded-md dark:bg-[#151d18]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Button className="!absolute !right-8 !top-8 !grid !size-9 !place-items-center !text-[#526258] dark:!text-[#c3d0c6] max-[560px]:!right-[18px] max-[560px]:!top-[18px]" type="text" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} aria-pressed={theme === 'dark'} icon={theme === 'light' ? <Moon size={18} /> : <Sun size={18} />} onClick={onToggleTheme} />
                <div className="mb-auto hidden w-full items-center gap-[9px] text-[13px] font-bold text-[#314638] max-[700px]:flex max-[560px]:mb-auto"><span className="grid size-[30px] place-items-center rounded-[9px] bg-[#b9d79e] text-[#243a30]"><Focus size={18} /></span> FocusPlanner</div>
                <div className="w-full max-w-[370px] max-[700px]:my-auto max-[560px]:mt-[55px]">
                    <p className="text-[10px] font-bold tracking-[1px] text-[#8b988e] dark:text-[#a2afa4]">YOUR WORKSPACE</p>
                    <h2 className="mb-1 mt-[10px] font-display text-[32px] font-normal text-[#26362c] dark:text-[#e3ebe4] max-[560px]:text-[29px]">{mode === 'signin' ? 'Welcome back' : 'Start with a clean slate'}</h2>
                    <Paragraph className="!mb-[23px] !text-[12px] !text-[#839087] dark:!text-[#a8b4aa]">{mode === 'signin' ? 'Sign in to pick up where you left off.' : 'Create an account and make today count.'}</Paragraph>
                    <Segmented
                        className="!mb-6 !bg-[#edf1eb] !p-1 dark:!bg-[#26312a] [&_.ant-segmented-item]:!text-[11px] [&_.ant-segmented-item]:!text-[#718076] dark:[&_.ant-segmented-item]:!text-[#b1beb4] [&_.ant-segmented-item-selected]:!text-[#315c4b] dark:[&_.ant-segmented-item-selected]:!text-[#d4e8d5]"
                        block
                        value={mode}
                        onChange={(value) => { setMode(value); setError(''); }}
                        options={[{ label: 'Sign in', value: 'signin' }, { label: 'Create account', value: 'signup' }]}
                    />
                    <Form className="[&_.ant-form-item]:!mb-[15px] [&_.ant-form-item-label]:!pb-[5px]" layout="vertical" onFinish={submit} requiredMark={false} key={mode}>
                        {mode === 'signup' && <Form.Item label="Full name" name="name" rules={[{ required: true, message: 'Enter your name.' }]}><Input autoComplete="name" placeholder="Your name" /></Form.Item>}
                        <Form.Item label="Email address" name="email" rules={[{ required: true, type: 'email', message: 'Enter a valid email.' }]}><Input autoComplete="email" placeholder="you@example.com" /></Form.Item>
                        <Form.Item label="Password" name="password" rules={[{ required: true, min: mode === 'signup' ? 6 : 1, message: mode === 'signup' ? 'Use at least 6 characters.' : 'Enter your password.' }]}>
                            <Input.Password autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'} iconRender={(visible) => visible ? <EyeOff size={16} /> : <Eye size={16} />} />
                        </Form.Item>
                        {error && <div className="mb-[15px] rounded-md border border-[#f1d8d0] bg-[#fff6f2] px-3 py-2.5 text-xs text-[#9a4f3e]" role="alert">{error}</div>}
                        <Button className="!mt-1 !flex !h-11 !items-center !justify-center !gap-[9px] !font-semibold" type="primary" htmlType="submit" loading={busy} block>
                            {mode === 'signin' ? 'Sign in' : 'Create account'} <ArrowRight size={17} />
                        </Button>
                    </Form>
                    <Text className="!mt-[18px] !block !text-center !text-[10px] !text-[#9aa49b] dark:!text-[#9ca99f]">Your tasks stay connected to your FocusPlanner account.</Text>
                </div>
            </motion.section>
        </main>
    );
}