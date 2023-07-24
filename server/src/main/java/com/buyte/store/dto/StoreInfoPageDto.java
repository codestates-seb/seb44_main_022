package com.buyte.store.dto;

import com.buyte.dto.PageInfoDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StoreInfoPageDto {
    List<StoreInfoDto> storeInfoList;
    PageInfoDto pageInfo;
}
