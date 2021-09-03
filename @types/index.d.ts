
declare module "use-file-upload" {
    type FileUpload = {
        source: URL
        name: string
        size: number
        file: File
    }

    type Callback = (file: FileUpload | [FileUpload]) => void

    const useFileUpload: () => [FileUpload | [FileUpload], ({ accept: string, multiple: boolean }, callback: Callback) => void]
}
