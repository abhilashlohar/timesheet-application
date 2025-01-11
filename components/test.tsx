import { jsPDF } from 'jspdf';
import Papa from 'papaparse';
import { useAppSelector } from '@/store/hooks';
import { isNotEmptyObject } from '@/utils';
import moment from 'moment';
import autoTable from 'jspdf-autotable'; // Import the autoTable plugin separately
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


declare module 'jspdf' {
    interface jsPDF {
        autoTable: any;
    }
}

const ExportData = () => {
    const workStatusData = useAppSelector((state) => state.timesheet.workStatusData);

    // Function to Export as PDF
    const exportPDF = () => {
        const doc = new jsPDF();
        const headers = ['Date', 'Status', 'Notes/Working Hours'];

        const tableData = workStatusData && Object.keys(workStatusData)?.map((key: string) => {
            const item = workStatusData[key] as any;
            return [
                moment(key).format('D MMM YYYY'),
                item.status,
                item.metaData?.notes || item.metaData?.workingHrs || '-',
            ];
        });

        doc.text('Exported Data', 20, 10);
        autoTable(doc, {
            head: [headers],
            body: tableData,
            startY: 20,
            theme: 'grid',
        });
        doc.save('data.pdf');
    };

    // Function to Export as CSV
    const exportCSV = () => {
        const output: any = []
        isNotEmptyObject(workStatusData) && Object.keys(workStatusData)?.map((key: string) => {
            const item = workStatusData[key] as any
            output.push({
                "Date": moment(key).format('D MMM YYYY'),
                "Status": item.status,
                "Notes": item.metaData?.notes || item.metaData?.workingHrs || '-',
            })
        })
        const csv = Papa.unparse(output);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'data.csv';
        link.click();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">Export</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Export data as</DropdownMenuLabel>
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={exportPDF}>PDF</DropdownMenuItem>
                    <DropdownMenuItem onClick={exportCSV}>CSV</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ExportData;
