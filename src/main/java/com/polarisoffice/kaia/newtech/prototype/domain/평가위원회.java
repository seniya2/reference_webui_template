package com.polarisoffice.kaia.newtech.prototype.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;

public class 평가위원회 {

	public @Id @GeneratedValue Long id;

	public String 이름;
	  
	private List<평가위원> 평가위원s = new ArrayList<평가위원>();
	
	
}
