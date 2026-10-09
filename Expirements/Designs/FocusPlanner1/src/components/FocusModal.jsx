import { Button, Input, Modal, Progress, Typography } from 'antd';
import { Bot, Check, CircleDot, Clock3, Pause, Play, StickyNote, Wrench } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AssistantChat from './AssistantChat.jsx';

const { TextArea } = Input;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const remainder = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${remainder}`;
}

export default function FocusModal({ task, theme, onClose, onFinish }) {
    const [seconds, setSeconds] = useState(0);
    const [note, setNote] = useState('');
    const [activeTool, setActiveTool] = useState('notes');
    const [paused, setPaused] = useState(false);
    const [busy, setBusy] = useState(false);
    const elapsedBase = useRef(0);
    const intervalStartedAt = useRef(null);

    useEffect(() => {
        if (!task) return undefined;
        setSeconds(0);
        elapsedBase.current = 0;
        intervalStartedAt.current = Date.now();
        setNote('');
        setActiveTool('notes');
        setPaused(false);
    }, [task?.id]);

    useEffect(() => {
        if (!task || paused) return undefined;
        const timer = window.setInterval(() => {
            if (intervalStartedAt.current !== null) {
                setSeconds(elapsedBase.current + Math.floor((Date.now() - intervalStartedAt.current) / 1000));
            }
        }, 1000);
        return () => window.clearInterval(timer);
    }, [task?.id, paused]);

    function togglePaused() {
        if (paused) {
            intervalStartedAt.current = Date.now();
            setPaused(false);
            return;
        }

        if (intervalStartedAt.current !== null) {
            elapsedBase.current += Math.floor((Date.now() - intervalStartedAt.current) / 1000);
            intervalStartedAt.current = null;
            setSeconds(elapsedBase.current);
        }
        setPaused(true);
    }

    async function finish() {
        setBusy(true);
        try {
            await onFinish(note.trim());
        } finally {
            setBusy(false);
        }
    }

    const cycleProgress = Math.round((seconds % 1500) / 1500 * 100);
    const cycleRemaining = 1500 - (seconds % 1500);
    const cycleRemainingLabel = `${Math.floor(cycleRemaining / 60).toString().padStart(2, '0')}:${(cycleRemaining % 60).toString().padStart(2, '0')}`;
    const tools = [
        { id: 'notes', label: 'Notes', icon: <StickyNote size={16} /> },
        { id: 'assistant', label: 'Assistant', icon: <Bot size={16} /> },
        { id: 'more', label: 'More tools', icon: <Wrench size={16} /> },
    ];

    return (
        <Modal open={Boolean(task)} onCancel={onClose} footer={null} width="min(980px, calc(100vw - 24px))" destroyOnHidden>
            {task && <div className="overflow-hidden rounded-lg bg-[#f7f9f5] text-left dark:bg-[#171f19]">
                <div className="flex items-start justify-between gap-4 border-b border-[#e1e8e0] px-7 py-5 dark:border-[#303b33] max-[640px]:px-4 max-[640px]:py-4">
                    <div className="min-w-0">
                        <div className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[1px] text-[#78907d] dark:text-[#a6bea8]"><CircleDot size={14} /> ACTIVE FOCUS SESSION <span className="rounded-full bg-[#e6f0e7] px-2 py-1 text-[9px] tracking-normal text-[#507459] dark:bg-[#2a3b2d] dark:text-[#b9d5bb]">{paused ? 'PAUSED' : 'IN FOCUS'}</span></div>
                        <Typography.Title level={2} className="!mb-1 !mt-0 !break-words !font-display !text-[25px] !font-normal !text-[#2c3b31] dark:!text-[#e0e7e1]">{task.title}</Typography.Title>
                        <p className="m-0 max-w-[640px] text-xs leading-[1.65] text-[#7f8d82] dark:text-[#aab6ac]">{task.description}</p>
                    </div>
                    <div className="shrink-0 rounded-md border border-[#e2e8e2] bg-white px-3 py-2 text-right dark:border-[#354138] dark:bg-[#202a23] max-[460px]:hidden">
                        <span className="block text-[9px] font-semibold tracking-[.7px] text-[#8c998f] dark:text-[#9eaaa1]">TASK PRIORITY</span>
                        <strong className="mt-1 block text-xs text-[#546d59] dark:text-[#c0d5c0]">{task.priority || '—'}</strong>
                    </div>
                </div>

                <div className="grid min-h-[420px] grid-cols-[minmax(0,1.05fr)_minmax(320px,.95fr)] max-[700px]:grid-cols-1">
                    <section className="flex flex-col items-center justify-center border-r border-[#e1e8e0] px-6 py-8 dark:border-[#303b33] max-[700px]:border-r-0 max-[700px]:border-b max-[700px]:py-7">
                        <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold tracking-[1px] text-[#87958a] dark:text-[#9eaaa1]"><Clock3 size={14} /> SESSION CLOCK</div>
                        <div className="relative grid size-[230px] place-items-center max-[420px]:size-[205px]">
                            <Progress type="circle" percent={cycleProgress} size={220} strokeWidth={3} showInfo={false} strokeColor={theme === 'dark' ? '#92c99b' : '#578866'} trailColor={theme === 'dark' ? '#303b33' : '#e2eae1'} />
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                                <span className="mb-2 text-[9px] font-semibold tracking-[1px] text-[#8d9a8f] dark:text-[#9eaaa1]">ELAPSED</span>
                                <strong className="font-display text-[37px] font-normal tabular-nums tracking-[1px] text-[#2e4634] dark:text-[#d9e8da] max-[420px]:text-[32px]">{formatTime(seconds)}</strong>
                                <span className="mt-2 text-[10px] text-[#8d9a8f] dark:text-[#9eaaa1]">Next break in {cycleRemainingLabel}</span>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-2">
                            <Button className="!h-[42px] !min-w-[130px]" type={paused ? 'primary' : 'default'} aria-pressed={paused} icon={paused ? <Play size={16} /> : <Pause size={16} />} onClick={togglePaused}>{paused ? 'Resume focus' : 'Pause session'}</Button>
                            <Button className="!h-[42px] !min-w-[130px]" type="primary" icon={<Check size={16} />} loading={busy} onClick={finish}>Finish task</Button>
                        </div>
                    </section>

                    <section className="min-w-0 px-6 py-6 max-[640px]:px-4">
                        <div className="mb-5 flex flex-wrap gap-1 rounded-lg bg-[#edf1eb] p-1 dark:bg-[#252f28]" role="tablist" aria-label="Focus tools">
                            {tools.map((tool) => <button key={tool.id} type="button" role="tab" aria-selected={activeTool === tool.id} className={`flex min-h-9 items-center gap-2 rounded-md border-0 px-3 text-[11px] font-semibold transition-colors ${activeTool === tool.id ? 'bg-white text-[#365b40] shadow-sm dark:bg-[#38473b] dark:text-[#d6e6d7]' : 'bg-transparent text-[#7d8a80] hover:text-[#365b40] dark:text-[#a5b1a7] dark:hover:text-white'}`} onClick={() => setActiveTool(tool.id)}>{tool.icon}<span>{tool.label}</span></button>)}
                        </div>

                        {activeTool === 'notes' && <div role="tabpanel" aria-label="Session notes">
                            <div className="mb-4"><h3 className="mb-1 mt-0 font-display text-[19px] font-normal text-[#334239] dark:text-[#dce5dd]">Working notes</h3><p className="m-0 text-[11px] leading-[1.6] text-[#849087] dark:text-[#9eaaa1]">Capture decisions and useful thoughts. Your notes will be saved with the task.</p></div>
                            <TextArea id="focus-note" value={note} onChange={(event) => setNote(event.target.value)} rows={8} placeholder="Jot down a decision, a question, or a useful thought..." />
                        </div>}

                        <AssistantChat task={task} active={activeTool === 'assistant'} />

                        {activeTool === 'more' && <div role="tabpanel" aria-label="Additional focus tools" className="flex min-h-[230px] flex-col items-center justify-center rounded-lg border border-dashed border-[#d8e2d8] px-6 text-center dark:border-[#3b483e]">
                            <span className="mb-3 grid size-11 place-items-center rounded-full bg-[#edf2ec] text-[#738776] dark:bg-[#27332a] dark:text-[#afbdaf]"><Wrench size={18} /></span>
                            <h3 className="mb-1 mt-0 font-display text-[19px] font-normal text-[#334239] dark:text-[#dce5dd]">Room for more tools</h3>
                            <p className="m-0 max-w-[250px] text-[11px] leading-[1.6] text-[#849087] dark:text-[#9eaaa1]">This workspace is ready for future focus tools and integrations.</p>
                        </div>}
                    </section>
                </div>
            </div>}
        </Modal>
    );
}