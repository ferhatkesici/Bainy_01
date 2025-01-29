import React from 'react';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ user, tasks, selectedEmployeeFilter, employees }) => {
  const getDepartment = (employeeName) => {
    const employee = employees.find(emp => emp.name === employeeName);
    return employee ? employee.department : 'Belirlenmemiş';
  };

  const exportToExcel = () => {
    const filteredTasks = tasks.filter(task => {
      if (selectedEmployeeFilter && task.employee !== selectedEmployeeFilter) return false;
      return true;
    });

    const exportData = filteredTasks.map(task => ({
      'TARIH': task.createdDate,
      'ÇALIŞAN': task.employee,
      'PRODÜKSİYON': task.project,
      'PROJE': task.name,
      'İŞ': 'X',
      'GERÇEKLEŞEN SAAT': task.hours || '-',
      'SAAT ÜCRET': '',
      'TOPLAM BEDEL': task.hours ? `₺${task.hours * 0}` : '₺0,00',
      'BÖLÜM': getDepartment(task.employee)
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();

    ws['!cols'] = [
      { width: 12 },
      { width: 15 },
      { width: 15 },
      { width: 25 },
      { width: 8 },
      { width: 15 },
      { width: 12 },
      { width: 15 },
      { width: 12 }
    ];

    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    
    const fileName = selectedEmployeeFilter 
      ? `tasks_${selectedEmployeeFilter}.xlsx`
      : 'tasks.xlsx';

    XLSX.writeFile(wb, fileName);
  };

  return (
    <button
      onClick={exportToExcel}
      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
    >
      Excel'e Aktar
    </button>
  );
};

export default ExportToExcel;