'use client'

import { FolderPlusIcon, PanelRightOpen, Search, Trash } from 'lucide-react'

import { FadeInSmall } from '@/components/animations/fade-in'
import { CultButton } from '@/components/cult/cult-button'
import { SIZE_PRESETS, useDynamicBlobSize } from '@/components/cult/dynamic-blob'
import { useGetDocumentSets } from '@/hooks/use-get-document-sets'
import { useStage, useToggleMobileNav } from '@/hooks/use-vector-blob'

export function BlobActions({ messages, handleReset }) {
  const { data, isLoading } = useGetDocumentSets() // fetch users previous document sets
  const { state: blobState, scheduleAnimation } = useDynamicBlobSize()
  const { setIsMobileNavOpen } = useToggleMobileNav()
  const { setStage } = useStage()

  function handleSearch() {
    if (blobState.size !== SIZE_PRESETS.LONG) {
      setStage('reset-search')
      scheduleAnimation([
        { size: SIZE_PRESETS.COMPACT, delay: 200 },
        { size: SIZE_PRESETS.LONG, delay: 700 },
      ])
    }
  }

  function handleUpload() {
    if (blobState.size !== SIZE_PRESETS.LARGE) {
      setStage('reset-upload')
      scheduleAnimation([
        { size: SIZE_PRESETS.COMPACT, delay: 200 },
        { size: SIZE_PRESETS.LARGE, delay: 700 },
      ])
    }
  }

  function handleOpenNav() {
    setIsMobileNavOpen(true)
  }

  const canRender = blobState.size === SIZE_PRESETS.LARGE || blobState.size === SIZE_PRESETS.LONG

  if (canRender) {
    return (
      <div className="flex  items-center justify-center rounded-t-md md:bg-transparent w-full">
        <div className="flex-row items-center justify-center flex w-full max-w-[250px] gap-2 group">
          {!isLoading ? (
            <FadeInSmall>
              <CultButton className="p-5" handleClick={handleUpload}>
                <FolderPlusIcon className="h-5 w-5 " />
              </CultButton>
            </FadeInSmall>
          ) : null}

          {data ? (
            <FadeInSmall>
              <CultButton className="p-5" handleClick={handleSearch}>
                <Search className="h-5 w-5 " />
              </CultButton>
            </FadeInSmall>
          ) : null}

          {data ? (
            <div className="md:hidden">
              <FadeInSmall>
                <CultButton className="p-5" handleClick={handleOpenNav}>
                  <PanelRightOpen className="h-5 w-5 " />
                </CultButton>
              </FadeInSmall>
            </div>
          ) : null}

          {messages.length > 1 ? (
            <FadeInSmall>
              <CultButton className="p-5" handleClick={handleReset}>
                <Trash className="h-5 w-5 " />
              </CultButton>
            </FadeInSmall>
          ) : null}
        </div>
      </div>
    )
  }
  return null
}
