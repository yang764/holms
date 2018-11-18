import { DateCell, ImageCell, LinkCell, TextCell } from '../../../containers/Tables/antTables/helperCells';
import { renderCell } from "../../../containers/Tables/antTables/configs";
import React, { Component } from 'react';
import IntlMessages from '../../../components/utility/intlMessages';
import clone from 'clone';

const columns = [
		  {
		    title: <IntlMessages id="antTable.title.courseCode" />,
		    key: 'courseCode',
		    width: 100,
		    render: object => renderCell(object, 'LinkCell', 'courseCode', { href: `/dashboard/courses/${object['courseCode'].toLowerCase()}` })
		  },
		  {
		    title: <IntlMessages id="antTable.title.courseName" />,
		    key: 'courseName',
		    width: 100,
		    render: object => renderCell(object, 'TextCell', 'courseName')
		  },
		  {
		    title: <IntlMessages id="antTable.title.teachingA" />,
		    key: 'teachingA',
		    width: 100,
		    render: object => renderCell(object, 'TextCell', 'teachingA')
		  },
		  {
		    title: <IntlMessages id="antTable.title.venue" />,
		    key: 'venue',
		    width: 100,
		    render: object => renderCell(object, 'TextCell', 'venue')
		  },
		  {
		    title: <IntlMessages id="antTable.title.courseStudentCount" />,
		    key: 'studentCount',
		    width: 100,
		    render: object => renderCell(object, 'DataCell', 'studentCount')
		  }
		];
		const sortColumns = [
		  { ...columns[0], sorter: true },
		  { ...columns[1], sorter: true },
		  { ...columns[2], sorter: true },
		  { ...columns[3], sorter: true },
		  { ...columns[4], sorter: false }
		];
		const smallColumns = [columns[0], columns[1], columns[2], columns[3], columns[4]];
		const tableInfo = {
		    title: 'Sortable Table',
   			value: 'sortView',
    		columns: clone(sortColumns)
		}




		

		export { columns, tableInfo}