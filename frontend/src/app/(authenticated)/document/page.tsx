'use client'

import { DataTableDemo } from "@/components/data-table"
import { Button } from "@/components/ui/button"


const DocumentPage = () =>{
    

    return (
        <div className="h-full content-center px-10">
            <h2>문서 리스트</h2>
            <Button onClick={() => 
                window.location.href = '/document/form'
            }>문서 기안하기</Button>
            <DataTableDemo />
        </div>
        
    )
}

export default DocumentPage